import React, {useState} from 'react';
import { render } from "react-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";

var cmd = require('node-cmd');
const fs = require('fs');
const writeFileP = require("write-file-p");

function App() {
  const [kodeObj, setKode] = useState({kode: '#include <iostream>\n\
using namespace std; \n\
\n\
int main() {\n\
    cout << "Hei, Martin!" << endl;\n\
    return 0;\n\
}', resultat: ""});
  //const [kode, setKode] = useState("");
  let editorTekst = kodeObj.kode;

  function onChange(newValue) {
    editorTekst = newValue;
  }

  function onButtonClick() {
    const nyMidlTekst = {kode: editorTekst, resultat: "Kompilerer ..."};
    setKode(nyMidlTekst);
    kompiler();
  }

  function kompiler() {
    axios.post('http://localhost:49160/cpp', { "editorTekst": editorTekst}).then(response => {
      console.log(response.data);
      const resTekst = {kode: editorTekst, resultat: response.data};
      setKode(resTekst);
    });
  }

  return (
    <div id="background">
      <div id="container">
        <div id="title">
          <h1>C++ Kompilator</h1>
        </div>
        <div id="editor">
          <AceEditor
            mode="c_cpp"
            theme="monokai"
            value={kodeObj.kode}
            onChange={onChange}
            name="aceEditor"
            enableBasicAutocompletion={true}
            width="100%"
            fontSize="14px"
            showPrintMargin={false}
            editorProps={{ $blockScrolling: true }}
          />
        </div>
        <div id="knapp">
          <button type="button" class="btn btn-outline-light btn-lg" onClick={() => onButtonClick()}>Kompiler og kjør</button>
        </div>
        <div id="result">
          <div><p>cppkompilator $ </p></div>
          <p>{kodeObj.resultat}</p>
        </div>
      </div>
    </div>
  );
}

export default App;


/*
<div id="terminal-result">
          <AceEditor
            theme="monokai"
            onChange={onChange}
            readOnly={true}
            name="aceResult"
            width="100%"
            fontSize="14px"
            showPrintMargin={false}
            editorProps={{ $blockScrolling: true }}
          />
        </div>
*/

