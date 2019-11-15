import React, { useRef, useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";
import AWS from "./aws.config";
import uuidv4 from "uuid/v4";

const App: React.FC = () => {
  const inputRef = useRef(null);
  const _upload = useCallback(async e => {
    await new Promise((res, rej) => {
      e.preventDefault();
      const file = inputRef.current.files[0];
      new AWS.S3.ManagedUpload({
        params: {
          Bucket: "heung.rocks/hello",
          Key: uuidv4(),
          Body: file
        }
      }).send((err, data) => {
        if (err) {
          rej(err);
          return;
        }
        console.log(data);
        res(data);
      });
    });
  }, []);

  return (
    <div className="App">
      <form onSubmit={_upload}>
        <input type={"file"} ref={inputRef} />
        <input type={"submit"} value={"제출"} />
      </form>
    </div>
  );
};

export default App;
