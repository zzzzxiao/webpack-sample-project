import React, { Component, PropTypes } from 'react'

class Counter extends Component {
    static propTypes = {
        value: PropTypes.number.isRequired,
        onIncrement: PropTypes.func.isRequired,
        onDecrement: PropTypes.func.isRequired
    }

    incrementIfOdd = () => {
        let { value, onIncrement } = this.props;
        if (value % 2 !== 0) {
            onIncrement()
        }
    }

    incrementAsync = () => {
         let { onIncrement } = this.props;
        setTimeout(onIncrement, 1000)
    }

    render() {
        const { value, onIncrement, onDecrement } = this.props;
        return (
            <p>
                Clicked: {value} times
                <br />
                <button onClick={onIncrement}> + </button>
                <br />
                <button onClick={onDecrement}> - </button>
                <br />
                <button onClick={this.incrementIfOdd}> Increment if odd </button>
                <br />
                <button onClick={this.incrementAsync}> Increment async </button>
            </p>
        )
    }
}

export default Counter
