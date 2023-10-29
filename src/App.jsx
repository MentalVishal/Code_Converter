import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import styled from "styled-components";
import axios from "axios";
import { Hourglass } from "react-loader-spinner";

function App() {
  const [language, setLanguage] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const backend = "https://text-generator-b3kp.onrender.com";

  const handelConvert = async () => {
    setLoading(true);
    const data = {
      text: text,
      convert: language,
    };
    await axios
      .post(`${backend}/converter`, data)
      .then((response) => {
        setResult(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handelGenerate = async () => {
    setLoading(true);
    const data = {
      text: text,
    };
    await axios
      .post(`${backend}/text`, data)
      .then((response) => {
        setResult(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handelSummarize = async () => {
    setLoading(true);
    const data = {
      text: text,
    };
    await axios
      .post(`${backend}/summarize`, data)
      .then((response) => {
        setResult(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Div>
      <div id="nav">
        <select
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
        >
          <option value="">Select Language</option>
          <option value="Hindi">Hindi</option>
          <option value="Sanskrit">Sanskrit</option>
          <option value="Telgu">Telgu</option>
          <option value="Tamil">Tamil</option>
          <option value="Malyalam">Malyalam</option>
          <option value="Bhojpuri">Bhojpuri</option>
        </select>

        <button className="button-29" onClick={handelConvert}>
          Translate
        </button>
        <button className="button-29" onClick={handelGenerate}>
          Generate
        </button>
        <button className="button-29" onClick={handelSummarize}>
          Summarise
        </button>
      </div>
      <div id="body">
        <div id="editor">
          <textarea
            placeholder="Write Your Text Here..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div>
        <div id="output">
          <h2>Output</h2>
          <br />
          {loading == true ? (
            <Hourglass
              visible={true}
              height="80"
              width="80"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={["#306cce", "#72a1ed"]}
            />
          ) : (
            <div id="result">
              <p>{result}</p>
            </div>
          )}
        </div>
      </div>
    </Div>
  );
}

export default App;

const Div = styled.div`
  * {
    margin: 0;
    padding: 0;
  }
  #editor {
    width: 50%;
  }
  #nav {
    margin: 1rem;
    justify-content: space-around;
    display: flex;
    flex-direction: row;
  }
  #editor textarea {
    width: 95%;
    height: 85vh;
    padding: 1.2rem 1rem 1rem 1.2rem;
    font-size: 1.2rem;
  }

  #nav select {
    width: 20%;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
  }

  #body {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
  #output {
    border: 1px solid black;
    width: 50%;
    padding: 1rem;
  }
  #result {
    font-size: 1.2 rem;
    font-weight: 600;
  }

  .button-29 {
    align-items: center;
    appearance: none;
    background-image: radial-gradient(
      100% 100% at 100% 0,
      #5adaff 0,
      #5468ff 100%
    );
    border: 0;
    border-radius: 6px;
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
      rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
      rgba(58, 65, 111, 0.5) 0 -3px 0 inset;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-flex;
    font-family: "JetBrains Mono", monospace;
    height: 48px;
    justify-content: center;
    line-height: 1;
    list-style: none;
    overflow: hidden;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
    text-align: left;
    text-decoration: none;
    transition: box-shadow 0.15s, transform 0.15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    will-change: box-shadow, transform;
    font-size: 18px;
  }

  .button-29:focus {
    box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px,
      rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
  }

  .button-29:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px,
      rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
    transform: translateY(-2px);
  }

  .button-29:active {
    box-shadow: #3c4fe0 0 3px 7px inset;
    transform: translateY(2px);
  }
`;
