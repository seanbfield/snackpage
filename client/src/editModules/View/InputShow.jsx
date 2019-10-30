import React, { Component } from 'react'
import autosize from "autosize";
import ImgUpload from './ImgUpload';
import URLButton from './URLButton';
import VideoEmbed from './VideoEmbed';
import { reorder } from "react-beautiful-dnd";


export default class InputShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [this.props.node]
    };
  }

  componentDidMount() {
    // this.textarea.focus();
    autosize(this.textarea);
  }

  render() {
    const { node } = this.props;

    const hlArea = {
      maxHeight: "100px",
      minHeight: "32px",
      width: "100%",
      resize: "none",
      // padding: "2%;",
      boxSizing: "border-box",

    };
    const subArea = {
      maxHeight: "500px",
      minHeight: "24px",
      width: "100%",
      resize: "none",
      // padding: "2%;",
      boxSizing: "border-box",
    };
    const txtArea = {
      maxHeight: "1600px",
      minHeight: "38px",
      width: "100%",
      resize: "none",
      // padding: "2%;",
      boxSizing: "border-box",
    };


    if (node.type === false) {
      return (
        <div>
          <p>Click a button</p>
        </div>
      )
    } else {
      return (
        <>
          {
            (node.type === 'buttonA') ?

              <textarea
                style={hlArea}
                ref={a => (this.textarea = a)}
                placeholder="type some text"
                rows={1}
                defaultValue=""
                id={node.id}
                className='editor-input-hl'
                type="text"
                onChange={this.props.inputContentHandler} />
              :
              (node.type === 'buttonB')
                ?

                <textarea
                  style={subArea}
                  ref={b => (this.textarea = b)}
                  placeholder="type some text"
                  rows={1}
                  defaultValue=""
                  id={node.id}
                  className='editor-input-sub'
                  type="text"
                  onChange={this.props.inputContentHandler} />

                :
                (node.type === 'buttonC') ?

                  <textarea
                    style={txtArea}
                    ref={c => (this.textarea = c)}
                    placeholder="type some text"
                    rows={1}
                    defaultValue=""
                    id={node.id}
                    className='editor-input-txt'
                    type="text"
                    onChange={this.props.inputContentHandler} />

                  :
                  (node.type === 'buttonD')
                    ?

                    <ImgUpload
                      image={this.image}
                      url={this.url}
                      value={this.progress}
                      id={node.id}
                      // onChange={this.handleChange}
                      onChange={this.props.inputContentHandler}
                    />

                    :
                    (node.type === 'buttonE')
                      ?

                      <VideoEmbed
                        url={this.url}
                        id={node.id}
                        // onChange={this.handleChange}
                        onChange={this.props.inputContentHandler}
                      />

                      :
                      (node.type === 'buttonF')
                        ?

                        <URLButton
                          url={this.url}
                          id={node.id}
                          title={this.title}
                          onChange={this.props.inputContentHandler}
                        />
                        :
                        ""
          }
        </>
      )
    }
  }
}