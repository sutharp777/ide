<template>
  <div id="inoutbox" :class="{ verticalPane : this.$store.state.isVertical, resizable : !this.$store.state.isVertical}" 
    class="fsHide" v-bind:style="{ fontSize: this.$store.state.fontSize + 'px' }" v-show="this.$store.state.showInOutBox">
    <div class="panel-input panel-default">
      <div class="panel-heading">
        <span>Input</span>
        <label id="uploadInputFile" ><span class="fa fa-folder-open" style="margin-left: 5px" aria-hidden="true"></span>
          <input type="file" ref="inputFileUpload" style="display:none" @change="uploadInput">
        </label>
        <a v-on:click="onCopyInput" id="copy-input"> 
          <i class="fa fa-paperclip" />
        </a>
        <button v-if="this.$store.state.isVertical" type="button" id="toggleHorizontalPane" class="btn btn-sm btn-menu" 
          :class="{ open : isOpen}" @click="open" @blur="close">
          <i class="fa fa-ellipsis-v" aria-hidden="true" style="font-size:14px"></i>
          <ul class="dropdown-menu">
            <li>
              <button type="button" class="btn btn-sm btn-menu" @click="shiftInOutBox">
                Dock to bottom
              </button>
            </li>
            <li>
              <button type="button" class="btn btn-sm btn-menu" @click="close">
                Dock to right
                <i class="fa fa-check" aria-hidden="true"></i>
              </button>
            </li>
          </ul>
        </button>
      </div>
      <textarea class="textbox" id="test-input" rows="2" wrap="off"
                placeholder="Specify Input" :value="this.$store.state.customInput"
                @change="customInputChange">
      </textarea>
    </div>
    <div class="panel-output panel-default">
      <div class="panel-heading">
        <span>Output</span>
        <button type="button" id="downloadOutput" class="btn btn-sm btn-menu" @click="downloadOutput()">
          <i class="fa fa-download" aria-hidden="true"></i>
        </button>
        <a v-on:click="onCopyOutput" id="copy-output"> 
          <i class="fa fa-paperclip"/>
        </a>
        <button v-if="!this.$store.state.isVertical" type="button" id="toggleVerticalPane" class="btn btn-sm btn-menu" 
          :class="{ open : isOpen}" @click="open" @blur="close">
          <i class="fa fa-ellipsis-v" aria-hidden="true" style="font-size:14px"></i>
          <ul class="dropdown-menu">
            <li>
              <button type="button" class="btn btn-sm btn-menu" @click="close">
                Dock to bottom
                <i class="fa fa-check" aria-hidden="true"></i>
              </button>
            </li>
            <li>
              <button type="button" class="btn btn-sm btn-menu" @click="shiftInOutBox">
                Dock to right
              </button>
            </li>
          </ul>
        </button>
      </div>
      <pre id="output">{{this.$store.state.output}}</pre>
    </div>
  </div>
</template>

<script>
  import * as download from 'downloadjs'
  export default {
    name: 'inoutbox',
    data() {
      return {
        isOpen: false
      }
    },
    mounted() {
      interact('#inoutbox.resizable')
        .resizable({
          edges: { top: true },
          restrictEdges: {
          outer: 'parent',
          endOnly: true,
        },
        restrictSize: {
          min: { height: 210 },
          max: { height: 510 }
        },
        inertia: true,
      })
      .on('resizemove', function (event) {
        const target = event.target,
          x = (parseFloat(target.getAttribute('data-x')) || 0),
          y = (parseFloat(target.getAttribute('data-y')) || 0)

        target.style.height = event.rect.height + 'px'

        target.style.webkitTransform = target.style.transform =
          'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
      })
    },
    methods: {
      shiftInOutBox() {
        this.$store.commit('shiftInOutBox')
      },
      open() {
        this.isOpen = !this.isOpen
      },
      close() {
        setTimeout(() => { this.isOpen=false },250 )
      },
      customInputChange(e) {
        this.$store.commit('changeCustomInput', e.target.value || e.target.result)
      },
      onCopyInput(e) {
        this.$copyText(this.$store.state.customInput).then((e) => {
          this.$notify({
            text: 'Input copied Successfully',
            type: 'success'
          })
        }, (e) => {
          this.$notify({
            text: 'Input could not be copied successfully',
            type: 'failure'
          })
          console.error(e)
        })
      },
      onCopyOutput(e) {
        this.$copyText(this.$store.state.output).then((e) => {
          this.$notify({
            text: 'Output copied Successfully',
            type: 'success'
          })
        }, (e) => {
          this.$notify({
            text: 'Output could not be copied successfully',
            type: 'failure'
          })
          console.error(e)
        })
      },
      uploadInput(e) {
        const files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        const file = files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
          console.log('Uploaded File: ' + file.name)
          this.$notify({
            text: 'Input Uploaded Successfully',
            type: 'success'
          })
          this.customInputChange(e)
          this.$refs.inputFileUpload.value = ""
        }
        reader.readAsText(file)
      },
      downloadOutput() {
        const output = this.$store.state.output;
        download(`data:text/plain;charset=utf-8,${encodeURIComponent(output)}`, "output.txt", 'text/plain')
      },
    }
  }
</script>

<style scoped>
  #inoutbox {
    position: fixed;
    width: 100vw;
    height: 210px;
    bottom: 0;
    left: 0;
    z-index: 20;
  }

  #output, #test-input {
    width: calc(50vw - 7px);
    border-radius: 0 !important;
    margin: 0;
    height: calc(100% - 50px);
    overflow: auto;
    background: #202020 !important;
    border: none;
    border-right: 1px solid #272727; 
    color: white !important;
  }

  #test-input, #output {
    resize: none;
    padding: 6px;
  }

  .panel-heading, .panel-input, .panel-output {
    width: calc(50vw - 7px);
    border-radius: 0;
    margin: 0;
  }

  .panel-heading {
    display: flex;
    align-items: center;
    height: 50px !important;
    padding: 8px 15px;
    background: #272727;
    color: #fff;
  }

  .panel-input, .panel-output {
    position: absolute;
    bottom: 0;
    display: inline-block;
    height: 100% !important;
    border-color: #202020;
  }

  .panel-output {
    right: 14px;
  }

  #toggleVerticalPane {
    display: none;
  }

   @media (max-width: 767px) {
    #toggleHorizontalPane {
      display: none;
    }

    .panel-heading, .panel-input, .panel-output, #output, #test-input {
      width: calc(100vw - 14px);
    }

    .panel-input, .panel-output {
      position: static;
      height: 50% !important;
      border-color: #202020;
    }
  }

  @media (min-width: 767px) {
    #toggleVerticalPane {
      display: inline-block;
    }

    .verticalPane#inoutbox {
      height: calc(100vh - 90px) !important;
      width: 100vw;
      position: relative;
      right: 0;
      left: 5px;
      top: calc(-100vh + 85px);
      z-index: 9;
      left: 5px;
    }

    .verticalPane #output, .verticalPane #test-input {
      width: calc(40vw - 5px);
    }

    .verticalPane .panel-heading, .verticalPane .panel-input, .verticalPane .panel-output {
      width: calc(40vw + 4px);
    }

    .verticalPane .panel-input, .verticalPane .panel-output {
      bottom: auto;
      top: 0;
      right: 0;
      height: 50% !important;
    }

    .verticalPane .panel-output {
      top: auto;
      bottom: 0;
    }
  }

  i.fa:hover {
    cursor: pointer;
  }

  .open > .dropdown-menu {
    display: list-item !important;
    background-color: #202020;
    font-size: 14px;
    overflow: hidden;
    top: 35px;
    right: 25px;
    width: 20%;
    left: auto;
  }

  #uploadInputFile{
    margin: 0px 0px 0px auto;
    padding: 0 10px;
    cursor: pointer;
  } 
  #downloadOutput {
    margin-left: auto;
  }
</style>