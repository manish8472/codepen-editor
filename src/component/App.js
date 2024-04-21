import React, {useState, useEffect} from "react";
import Editor from './Editor'
import useLocalStorage from "../hooks/useLocalStorage";
import useWindowDimensions from "./useWindowDimensions";


function App() {

  const [html, setHTML] = useLocalStorage('html', '')
  const [css, setCSS] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js','')
  const [srcDoc, setSrcDoc] = useState('')
  const [openHTML , setOpenHTML] = useState(true);
  const [openCSS , setOpenCSS] = useState(false);
  const [openJS , setOpenJS] = useState(false);
  const [openResult , setOpenResult] = useState(false);
  // const [width, setWidth] = useState()
  const { height, width } = useWindowDimensions();

function htmlToggle(){
  setOpenHTML(true)
  setOpenCSS(false);
  setOpenJS(false)
  setOpenResult(false)
}
function cssToggle(){
  setOpenCSS(true);
  setOpenJS(false)
  setOpenHTML(false)
  setOpenResult(false)
}
function jsToggle(){
  setOpenJS(true)
  setOpenHTML(false)
  setOpenCSS(false);
  setOpenResult(false)
}
function resultToggle(){
  setOpenResult(true)
  setOpenJS(false)
  setOpenHTML(false)
  setOpenCSS(false);
}

// for showing output of code after 500msec

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>
    `
    )
    }, 500)

    return () =>clearTimeout(timeout)
    
  }, [html, css, js])

  return (

     <>
     
     <div className="toggle-button-area">
      <button id="html-toggle" className="selected" onClick={htmlToggle}>HTML</button>
      <button id="css-toggle" className="selected" onClick={cssToggle}>CSS</button>
      <button id="js-toggle" className="selected" onClick={jsToggle}>JS</button>
      <button id="result-toggle" className="selected" onClick={resultToggle}>Result</button>
     </div>

  {/* for mobile and tab , how to showing home page */}

  {width <= 700 && <span> {!openResult && <div className="pane top-pane toggle-pen">
     {openHTML && <Editor
        language="xml"
        displayName="HTML"
        value={html}
        onChange={setHTML}
        icon="/"
      /> }
     {openCSS && <Editor
        language="css"
        displayName="CSS"
        value={css}
        onChange={setCSS}
        icon="*"
      /> }
     {openJS && <Editor
        language="javascript"
        displayName="JS"
        value={js}
        onChange={setJs}
        icon="()"
        /> }
    </div>}

    {openResult&& <div className="pane">
      <iframe
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
        width="100%"
        height="100%"
      /> 
     </div>} </span> }

    {/* for laptop */}

   {width>700 && <>  <div className="pane top-pane ">
     <Editor
        language="xml"
        displayName="HTML"
        value={html}
        onChange={setHTML}
        icon="/"
      />
      <Editor
        language="css"
        displayName="CSS"
        value={css}
        onChange={setCSS}
        icon="*"
      />
      <Editor
        language="javascript"
        displayName="JS"
        value={js}
        onChange={setJs}
        icon="()"
        />
     </div>

     <div className="pane">
      <iframe
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
        width="100%"
        height="100%"
      />
     </div> </> }
     <footer>
      <span>Created by @<a href="https://www.linkedin.com/in/manish-kumar-160637200">manish</a> </span>
     </footer>
     </>
  );
}

export default App;

