import React, { useRef, useCallback, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import AWS from "./aws.config";
import uuidv4 from "uuid/v4";

const App: React.FC = () => {
  const inputRef = useRef(null);
  const [path, setPath] = useState("data:image/png;base64,0909090");
  const _upload = useCallback(async e => {
    const result: any = await new Promise((res, rej) => {
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
          console.log(err);
          return;
        }
        res(data);
      });
    });

    console.log(result);
    const s3 = new AWS.S3();
    s3.getObject({ Bucket: "heung.rocks", Key: result.key }, (err, data) => {
      console.log(data);
      setPath(URL.createObjectURL(new (Blob as any)([data.Body])));
    });
  }, []);

  // useEffect(() => {

  //   return () => {
  //   };
  // }, [path])

  return (
    <div className="App">
      <img src={path} onError={() => {}} />
      <form onSubmit={_upload}>
        <input type={"file"} ref={inputRef} />
        <input type={"submit"} value={"제출"} />
      </form>
    </div>
  );
};

export default App;
