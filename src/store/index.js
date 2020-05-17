/**
 * Created by abhishek on 14/06/17.
 */
"use strict";

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import base64 from "base-64";
import shajs from "sha.js";
import VuexPersistence from "vuex-persist";
import samples from "../assets/js/sample-source";
import VueClipboard from "vue-clipboard2";
import SocialSharing from "vue-social-sharing";
import { httpGet, httpPost } from "../utils/api";

import userModule from "./user";
import firebaseModule from "./firebase";

Vue.use(VueClipboard);
Vue.use(SocialSharing);
Vue.use(Vuex);

const extension = {
  c: ".c",
  cpp: ".cpp",
  java8: ".java",
  py2: ".py",
  nodejs8: ".js",
  nodejs10: ".js",
  jsv: ".js"
};

export default new Vuex.Store({
  state: {
    code: Object.assign({}, samples),
    sampleCodes: samples,
    langs: {},
    language: "cpp",
    theme: "vs-dark",
    font: "Ubuntu Mono",
    fontSize: 16,
    tabSize: 4,
    showInOutBox: false,
    showSettings: false,
    customInput: "",
    customInputBuf: "", //input buffer to store customInput when toggled OFF
    output: "",
    fileName: "download.cpp",
    isChanged: false,
    autoSave: true,
    autoSaveIntervalId: null,
    checkData: "",
    codeId: null,
    codeTitle: "",
    submissionId: null
  },
  modules: {
    user: userModule,
    firebase: firebaseModule
  },
  mutations: {
    toggleInOutBox(state) {
      state.showInOutBox = !state.showInOutBox;
    },
    toogleSettings(state) {
      state.showSettings = !state.showSettings;
    },
    changeLanguage(state, val) {
      state.language = val;
      state.fileName = `download${extension[state.language]}`;
    },
    updateCode(state, val) {
      state.code[state.language] = val;
    },
    setLangs(state, val) {
      state.langs = {
        ...val,
        jsv: {
          lang_slug: "jsv",
          lang_name: "Javascript"
        }
      };
    },
    setCode(state, val) {
      state.code[state.language] = val;
    },
    uploadCode(state, val) {
      state.code[state.language] = val;
    },
    updateOutput(state, val) {
      state.output = val;
    },
    fileNameChange(state, val) {
      state.fileName = val;
    },
    changeCustomInput(state, val) {
      state.customInput = val;
    },
    changeTheme(state, val) {
      state.theme = val;
    },
    changeFont(state, val) {
      state.font = val;
    },
    changeFontSize(state, val) {
      state.fontSize = val;
    },
    changeTabSize(state, val) {
      state.tabSize = val;
    },
    setCheckData(state, val = "") {
      state.checkData = shajs("sha256")
        .update(val)
        .digest("hex");
    },
    resetEditor(state) {
      state.theme = "vs-dark";
      state.font = "Ubuntu Mono";
      state.fontSize = 16;
      state.tabSize = 4;
    },
    resetCode(state) {
      state.code[state.language] = samples[state.language];
      state.codeId = null;
    },
    setIsChanged(state, val) {
      state.isChanged = val;
    },
    setCodeId(state, val) {
      state.codeId = val;
    },
    setCodeTitle(state, val) {
      state.codeTitle = val;
    },
    setSubmissionId(state, val) {
      state.submissionId = val;
    }
  },
  plugins: [
    new VuexPersistence({
      storage: window.localStorage,
      reducer: function(state) {
        const included = ["user", "showInOutBox", "showSettings", "font", "fontSize", "tabSize"];
        console.log(state);
        return Object.keys(state)
          .filter(key => included.includes(key))
          .reduce((acc, key) => ({ [key]: state[key], ...acc }), {});
      }
    }).plugin
  ],
  actions: {
    runJs(context, { state, code, input }) {
      let jsWorker = new Worker("../../static/jsWorker.js");
      input = JSON.stringify(input);
      jsWorker.postMessage({ code, input });
      return new Promise((resolve, reject) => {
        jsWorker.onmessage = function(e) {
          const output = e.data.join("\n");
          context.commit("updateOutput", output);
          if (output.match(/^Error.*$/)) {
            reject({
              result: "complie_error"
            });
          }
          resolve({
            result: "success",
            data: {
              testcases: [
                {
                  result: "success"
                }
              ]
            }
          });
        };
      });
    },

    loadDataFromServer({ state, commit, dispatch }) {
      const pasteId = state.route.params.id;

      return Promise.all([
        httpGet("/langs").then(({ data }) => {
          commit(
            "setLangs",
            data.reduce((langs, lang) => {
              langs[lang.lang_slug] = lang;
              return langs;
            }, {})
          );

          return data;
        }),
        state.route.name === "saved" &&
          httpGet(`/code/${pasteId}`).then(({ data }) => {
            commit("setCodeId", data.id);
            commit("setCode", data.code);
            commit("changeCustomInput", data.customInput);
            commit("fileNameChange", data.fileName);
            commit("setCheckData", data.code), commit("setCodeTitle", data.title);

            return data;
          })
      ]).then(([langs, code]) => {
        commit("changeLanguage", code ? code.language : "cpp");
        if (code.code) {
          commit("setCode", code.code);
        }
        return [langs, code];
      });
    },
    saveDataToServer({ state, commit, dispatch }) {
      if (
        state.checkData ==
        shajs("sha256")
          .update(state.code[state.language])
          .digest("hex")
      )
        return Promise.resolve({
          data: {
            id: state.codeId
          }
        });
      else {
        return httpPost(`/code`, {
          id: state.codeId || void 0,
          language: state.language,
          code: state.code[state.language],
          customInput: state.customInput,
          fileName: state.fileName,
          title: state.codeTitle
        }).then(response => {
          const { data } = response;
          commit("setCodeId", data.id);
          commit("setCheckData", data.code);
          return response;
        });
      }
    },
    runCode({ state, commit, dispatch }) {
      if (state.language === "jsv") {
        return dispatch("runJs", {
          state: state,
          code: state.code[state.language],
          input: state.customInput
        });
      }

      return httpPost("/run", {
        lang: state.language,
        source: base64.encode(state.code[state.language]),
        input: base64.encode(state.customInput)
      })
        .then(({ data: { id } }) => {
          const start = new Date();

          const poll = async () => {
            const { data } = await httpGet(`run/${id}`);

            if (!data.is_completed && state.submissionId === id && new Date() - start <= 20 * 1000 /* 20 sec */) {
              return new Promise(resolve => setTimeout(() => resolve(poll()), 1000));
            }

            if (data.is_completed) {
              return data;
            }

            throw new Error("There was some error");
          };

          commit("setSubmissionId", id);

          return poll();
        })
        .then(async data => {
          if (data.outputs.length) {
            try {
              const { data: output } = await axios.get(data.outputs[0]);

              commit("updateOutput", data.is_successful ? base64.decode(output.stdout) : base64.decode(output.stderr));
            } catch (err) {
              console.log(err);
            }
          }

          return data;
        });
    }
  }
});
