import React from 'react'
import UniqueID from 'react-html-id';
import EditButtonContainer from '../editModules/Button/EditButtonContainer'
import TextAreaField from '../editModules/View/TextAreaField';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 0.4,
  margin: `0  ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? "#81ecec" : "white",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "#81ecec" : "white",
  padding: grid,
  width: 450
});

let index = 0;

export default class Edit extends React.Component {
  constructor(props) {
    super(props)
    UniqueID.enableUniqueIds(this);
    this.state = {
      inputs: [],
      text: ''

    }
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const inputs = reorder(
      this.state.inputs,
      result.source.index,
      result.destination.index
    );

    this.setState({
      inputs
    });
    console.log(this.state.inputs);
  }

  // Handler for listen from button.
  buttonCheck = (e) => {
    index++;
    const node = {
      id: this.nextUniqueId() + index,
      type: e.target.id,
      text: '',
      image: true
    }
    this.setState(
      prev => ({
        inputs: [...prev.inputs, node]
      })
    )
    console.log(this.state.inputs);
  }

  inputContentHandler = (e) => {
    let newArray = this.state.inputs;
    let newNode = newArray.find((node) => {
      return (node.id === e.target.id)
    })
    newNode.text = e.target.value;

    this.setState({ inputs: newArray });
  }

  createPage = async () => {
    await this.props.postPage(this.state.inputs)
  }




  render() {

    if (this.state.inputs.length === 0) {
      return (
        <>
          <div className='some-page-wrapper-clr'>
            <div className='row'>
              <div className="dash-card-head">
                <EditButtonContainer buttonCheck={this.buttonCheck} />
              </div>
            </div>
            <div className='row'>
              <div className="dash-card-sm">
                <h2 className="center-it">
                  Make a new Snack Page
                </h2>
                <p>Click a button to edit</p>
                <h3 className="center-it">
                  swipe to view tour
                </h3>
              </div>
            </div>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className='some-page-wrapper-clr'>
            <div className='row'>
              <div className="dash-card-head">
                <br />
                <EditButtonContainer buttonCheck={this.buttonCheck} />
              </div>
            </div>
            <div className='row'>
              <div className="dash-card-sm">
                <DragDropContext onDragEnd={this.onDragEnd}>
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                      >
                        {this.state.inputs.map((input, index) => (
                          <Draggable key={input.id} draggableId={input.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <TextAreaField
                                  inputField={input}
                                  inputContentHandler={this.inputContentHandler}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
            <div className='row'>
              <div className="dash-card-head">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    this.createPage();
                  }}
                >Publish</button>
              </div>
            </div>
          </div >
        </>
      )
    }
  }
}