import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = ({ code }) => {
    if (code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { children, onClose } = this.props;
    return (
      <div className="Overlay" onClick={onClose}>
        <div className="Modal">{children}</div>
      </div>
    );
  }
}

Modal.propTypes = {
  // children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
