// FormInput React component - represents a input of a form
FormInput = React.createClass({
  propTypes: {
    hasError: React.PropTypes.bool,
    label: React.PropTypes.string,
    type: React.PropTypes.string,
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    onKeyUp: React.PropTypes.func,
    onBlur: React.PropTypes.func
  },
  shouldComponentUpdate() {
    return true;
  },
  render() {
    const {type, label, name, value, onKeyUp, onBlur } = this.props;
    let inputType;
    
    switch (type) {
      case 'textarea':
        inputType = (
          <textarea type={ type } name={ name.toLowerCase() } placeholder={ name } defaultValue={ value } onKeyUp={ onKeyUp } onBlur={ onBlur }></textarea>
        );
        break;
      default:
        inputType = (
          <input type={ type } name={ name.toLowerCase() } placeholder={ name } defaultValue={ value } onKeyUp={ onKeyUp } onBlur={ onBlur }/>
        );
        break;
    }

    return (
      <div>
        { label === 'none' ? '' : <label htmlFor={ name.toLowerCase() } >{ label }</label> }
        { inputType }
      </div>
    )
  }
});