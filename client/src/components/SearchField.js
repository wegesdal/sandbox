import React from 'react';

const searchFieldStyle = {
  border: '1px #4f43ae solid',
  borderRadius: 6,
  height: '2.2rem',
  display: 'inline-flex',
  justifyContent: 'space-between',
  backgroundColor: '#fff'
};

const searchFieldInputStyle = {
  outline: 'none',
  paddingTop: '0.7rem',
  paddingBottom: '0.8rem',
  marginLeft: 10,
  border: 'none',
  flex: 1,
  color: '#4f43ae',
  fontSize: '1rem',
  fontWeight: 100,
  backgroundColor: 'transparent'
};

class SearchField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.searchText,
    };
    this.onChangeBound = this.onChangeBound.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.searchText !== prevProps.searchText) {
      this.setState({
        value: this.props.searchText,
      });
    }
  }

  onChangeBound(event) {
    this.setState({
      value: event.target.value,
    });
      this.props.onChange(event.target.value, event);
  }

  render() {
    const {
      classNames,
      placeholder,
    } = this.props;
    const className = `react-search-field ${classNames}`;

    return (
      <div
        className={className}
        style={searchFieldStyle}
      >
        <input
          className="react-search-field-input"
          style={searchFieldInputStyle}
          onChange={this.onChangeBound}
          placeholder={placeholder}
          type="text"
          value={this.state.value}
        />
      </div>
    );
  }
}

SearchField.defaultProps = {
  classNames: '',
  searchText: '',
  placeholder: 'Search',
  onChange: null
};

export default SearchField;