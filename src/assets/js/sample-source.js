/**
 * Created by abhishek on 15/06/17.
 */
'use strict';

/**
 * Created by umair on 27/12/16.
 */

const c_sample =
  '#include <stdio.h>\n' +
  'int main() {\n' +
  '    printf("Hello World!");\n' +
  '}\n';

const cpp_sample =
  '#include <iostream>\n' +
  'using namespace std;\n' +
  'int main() {\n' +
  '    cout<<"Hello World!";\n' +
  '}\n';

const csharp_sample =
  'using System;\n' +
  'namespace HelloWorld\n' +
  '{\n' +
  '    class Hello\n' +
  '    {\n' +
  '        static void Main()\n' +
  '        {\n' +
  '            Console.WriteLine("Hello World!");\n' +
  '        }\n' +
  '    }\n' +
  '}\n';

const java_sample =
  'public class Main {\n' +
  '    public static void main(String args[]) {\n' +
  '        System.out.println("Hello World!");\n' +
  '    }\n' +
  '}';

const py2_sample =
  'print("Hello World!")';

const py3_sample =
  'print("Hello World!")';

const js_sample =
  `/* 
    Use INPUT variable to get stdin.
    Try console.log(INPUT);
*/
    console.log('Hello World');`;

const ruby_sample = 'puts "Hello World!";'

const rust_sample =
  'fn main() {\n' +
  '  println!("Hello, world!");\n' +
  '}\n';

const go_sample =
  'package main\n' +
  'import "fmt"\n' +
  'func main() {\n' +
  '  fmt.Println("Hello World!")\n' +
  '}\n';

const kotlin_sample = 
  'fun main(args: Array<String>) {\n' +
  '  println("Hello World")\n' +
  '}\n';

const lang_samples = {
  'c': c_sample,
  'cpp': cpp_sample,
  'csharp': csharp_sample,
  'java8': java_sample,
  'py2': py2_sample,
  'py3': py3_sample,
  'jsv': js_sample,
  'nodejs8': js_sample,
  'nodejs10': js_sample,
  'ruby': ruby_sample,
  'rust': rust_sample,
  'golang': go_sample,
  'kotlin': kotlin_sample
};

export default lang_samples
