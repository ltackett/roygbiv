import rewire from "rewire"
import React from "react"
import ReactDOM from "react-dom"
const App = rewire("./App")
const mapStateToProps = App.__get__("mapStateToProps")
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// @ponicode
describe("mapStateToProps", () => {
    test("0", () => {
        let callFunction = () => {
            mapStateToProps({ auth: "user_name", firebase: { auth: "username", isInitializing: true }, firestore: { ordered: { charts: [1.0, 0.0, -0.5] }, data: { charts: [-0.5, 10.0, 0.5] } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            mapStateToProps({ auth: "user_name", firebase: { auth: "user name", isInitializing: false }, firestore: { ordered: { charts: [10.0, -29.45, 1.0] }, data: { charts: [-1.0, 0.5, 0.5] } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            mapStateToProps({ auth: 123, firebase: { auth: "user name", isInitializing: false }, firestore: { ordered: { charts: [10.0, -0.5, 1.0] }, data: { charts: [0.5, -0.5, -1.0] } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            mapStateToProps({ auth: "username", firebase: { auth: "user123", isInitializing: false }, firestore: { ordered: { charts: [10.0, 0.5, 10.23] }, data: { charts: [0.5, -1.0, -29.45] } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            mapStateToProps({ auth: "user_name", firebase: { auth: "user123", isInitializing: true }, firestore: { ordered: { charts: [-1.0, 0.5, 10.23] }, data: { charts: [0.5, 0.0, 10.0] } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            mapStateToProps(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
