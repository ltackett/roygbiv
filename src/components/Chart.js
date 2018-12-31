import React, { Component, Fragment } from 'react';
import styled from 'styled-components'

const Header = styled.header`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  padding: 0.25rem 0;
`

const ChartOptions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column-reverse;
  align-items: stretch;
  align-content: stretch;
`

const Color = styled.div`
  overflow: hidden;
  position: relative;
  background-color: ${props => props.color || '#000'};
  color: #fff;
  flex: 1;
`

const Clip = styled.span`
  position: absolute;
  top: 50%;
  transform: translate(0,-50%);
  font-size: 3.5rem;

  display: inline-block;
  padding: 1rem;
`

const Button = styled.button`
  font-size: 3.5rem;
  background: transparent;
  border: 0;
  margin: 0.5rem;
  padding: 0;

  span {
    display: inline-block;
  }

  &:active span {
    box-shadow: none;
    transform: translate(0, 0.05em)
  }
`

const roygbiv = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'violet'
]

class Chart extends Component {
  state = {
    clipAt: this.props.chartsData[this.props.match.params.id].clipAt || 3
  }

  componentDidUpdate(prevProps) {
    const { chartsData, match } = this.props
    const prevChartsData = prevProps.chartsData

    const chart = chartsData[match.params.id]
    const prevChart =  prevChartsData[match.params.id]

    if (prevChart.clipAt !== chart.clipAt) {
      this.setState({ clipAt: chart.clipAt })
    }
  }

  moveClip = (by) => {
    const pos = this.state.clipAt + by
    if (pos < 0 || pos >= roygbiv.length) {
      return
    }

    // Instantly set local state
    this.setState({ clipAt: pos })

    // Update firebase
    const { firestore, match } = this.props
    const chartToUpdate =  {
      clipAt: pos,
      updatedAt: firestore.FieldValue.serverTimestamp()
    }
    firestore.update({ collection: 'charts', doc: match.params.id }, chartToUpdate);
  }

  handleMoveDown = () => { this.moveClip(-1) }
  handleMoveUp   = () => { this.moveClip(1) }

  render() {
    return (
      <Fragment>
        <Header>
          <Button neg onClick={this.handleMoveDown}><span role="img" aria-label="Move Down">👎</span></Button>
          <Button pos onClick={this.handleMoveUp}><span role="img" aria-label="Move Up">👍</span></Button>
        </Header>

        <ChartOptions>
          {roygbiv.map((c, i) =>
            <Color color={c} key={c}>
              {this.state.clipAt === i &&
                <Clip>
                  <span role="img" aria-label="icon">
                    {i <= 0 &&           "🚫"}
                    {i >= 1 && i <= 5 && "💲"}
                    {i >= 6 &&           "💲 💲 🤑"}
                  </span>

                  {" "}

                  <span role="img" aria-label="icon">
                    {i === 0 && "💩"}
                    {i === 1 && "😱"}
                    {i === 2 && "😕"}
                    {i === 3 && "☺️"}
                    {i === 4 && "😊"}
                    {i === 5 && "😃"}
                    {i === 6 && "😍"}
                  </span>
                </Clip>
              }
            </Color>
          )}
        </ChartOptions>
      </Fragment>
    );
  }
}

export default Chart
