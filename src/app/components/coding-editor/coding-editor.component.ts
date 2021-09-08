import {Component} from '@angular/core';

// declare var Blockly: any;
import * as Blockly from 'blockly';

@Component({
  selector: 'app-coding-editor',
  templateUrl: './coding-editor.component.html',
  styleUrls: ['./coding-editor.component.scss']
})
export class CodingEditorComponent {
  constructor() {
  }

  workspace: any;
  // @ts-ignore
  // @ViewChild('toolbox') toolbox: ElementRef;

  ngAfterViewInit(): void {
  }

  initiateBlockly() {
    debugger;
    /*https://developers-dot-devsite-v2-prod.appspot.com/blockly/blockly-demo/blockly-demo*/
    // @ts-ignore
    var workspace = Blockly.inject('blocklyDiv', {toolbox: document.getElementById('toolbox')});
    var defaultBlocks = document.getElementById('blocklyDefault');
    // @ts-ignore
    Blockly.Xml.domToWorkspace(defaultBlocks, workspace);

    function myUpdateFunction() {
      var languageDropdown = document.getElementById('languageDropdown');
      // @ts-ignore
      var languageSelection = languageDropdown.options[languageDropdown.selectedIndex].value;
      var codeDiv = document.getElementById('codeDiv');
      var codeHolder = document.createElement('pre');
      codeHolder.className = 'prettyprint but-not-that-pretty';
      // @ts-ignore
      var code = document.createTextNode(Blockly[languageSelection].workspaceToCode(workspace));
      codeHolder.appendChild(code);
      // @ts-ignore
      codeDiv.replaceChild(codeHolder, codeDiv.lastElementChild);
      // @ts-ignore
      prettyPrint();
    }

    workspace.addChangeListener(myUpdateFunction);

    function executeBlockCode() {
      // @ts-ignore
      var code = Blockly.JavaScript.workspaceToCode(workspace);
      // @ts-ignore
      var initFunc = function (interpreter, scope) {
        // @ts-ignore
        var alertWrapper = function (text) {
          text = text ? text.toString() : '';
          return interpreter.createPrimitive(alert(text));
        };
        interpreter.setProperty(scope, 'alert',
          interpreter.createNativeFunction(alertWrapper));
        // @ts-ignore
        var promptWrapper = function (text) {
          text = text ? text.toString() : '';
          return interpreter.createPrimitive(prompt(text));
        };
        interpreter.setProperty(scope, 'prompt',
          interpreter.createNativeFunction(promptWrapper));
      };
      // @ts-ignore
      var myInterpreter = new Interpreter(code, initFunc);
      var stepsAllowed = 10000;
      while (myInterpreter.step() && stepsAllowed) {
        stepsAllowed--;
      }
      if (!stepsAllowed) {
        throw EvalError('Infinite loop.');
      }
    }
    // @ts-ignore
    document.getElementById('playButton').addEventListener('click', executeBlockCode);
  }
}
