import React from "react";

export default function NewsTile(props) {
  const date = new Date(props.data.datetime * 1000).toISOString().slice(0, 10);

  return (
    <div className="newstile row my-4">
      <div className="col-4 image">
        <a href={props.data.url} target="_blank">
          <img src={props.data.image} width={150} alt="News item" />
        </a>
      </div>
      <div className="col-8 description text-left">
        <a href={props.data.url} target="_blank" className="invisible-link">
          <h2>{props.data.headline}</h2>
          <p>{props.data.source.toUpperCase() + ", " + date}</p>
          <hr />
          <p>{props.data.summary}</p>
        </a>
      </div>
    </div>
  );
}
