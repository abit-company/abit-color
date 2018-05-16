import React, { PureComponent } from "react";
import { uniqueId } from "lodash";
import { Consumer } from "./Context";

class RectElement extends PureComponent {
  id = uniqueId();

  draw = ctx => {
    const { color, height, width, x, y } = this.props;
    ctx.fillStyle = color || "black";
    ctx.fillRect(x, y, width, height);
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.drawFocusIfNeeded(document.getElementById(this.id));
    ctx.restore();
  };

  componentDidMount() {
    this.props.updateElement({
      id: this.id,
      draw: this.draw,
      props: this.props
    });
  }
  componentDidUpdate() {
    this.props.updateElement({
      id: this.id,
      draw: this.draw,
      props: this.props
    });
  }
  handleFocusState = () => {
    this.forceUpdate();
  };
  render() {
    return (
      <input
        type="button"
        id={this.id}
        onFocus={this.handleFocusState}
        onBlur={this.handleFocusState}
      />
    );
  }
}

class Rect extends PureComponent {
  render() {
    return (
      <Consumer>
        {({ updateElement, deleteElement }) => (
          <RectElement
            {...this.props}
            updateElement={updateElement}
            deleteElement={deleteElement}
          />
        )}
      </Consumer>
    );
  }
}

export default Rect;
