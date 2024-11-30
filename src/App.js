import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    isTrue: false,
    latestList: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  enterWebsite = event => {
    this.setState({website: event.target.value})
  }

  enterUsername = event => {
    this.setState({username: event.target.value})
  }

  enterPassword = event => {
    this.setState({password: event.target.value})
  }

  addContent = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const newValues = {
      id: v4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      passwordName: password,
      classAdd: classValue,
    }
    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValues],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = e => {
    if (e.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  serachList = e => {
    this.setState({searchInput: e.target.value})
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(each => each.id !== id)
    const caseOf = newList.length !== 0
    this.setState({latestList: newList, isTrue: caseOf})
  }

  render() {
    const {website, username, password} = this.state
    const {latestList, isShow, searchInput} = this.state

    let {isTrue} = this.state
    const newList = latestList.filter(each =>
      each.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="main-container">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="sub-container1">
          <form className="add-details" onSubmit={this.addContent}>
            <h1 className="heading">Add New Password</h1>
            <div className="website-container">
              <img
                className="image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                className="website-input"
                type="text"
                placeholder="Enter Website"
                value={website}
                onChange={this.enterWebsite}
              />
            </div>

            <div className="website-container">
              <img
                className="image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                className="website-input"
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={this.enterUsername}
              />
            </div>

            <div className="website-container">
              <img
                className="image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                className="website-input"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={this.enterPassword}
              />
            </div>
            <button type="submit" className="btn">
              Add
            </button>
          </form>
          <img
            className="password-manager-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
        </div>

        <div className="sub-container2">
          <div className="password-container">
            <diV className="length-container">
              <h1 className="title">Your Passwords</h1>
              <p className="length">{newList.length}</p>
            </diV>
            <div className="serach-container">
              <img
                className="image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                className="search"
                placeholder="Search"
                onChange={this.serachList}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="show-passwortd-container">
            <input
              type="checkbox"
              className="check-box"
              id="check"
              onChange={this.showPassword}
            />
            <label htmlFor="check" className="label">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-state">
              <img
                className="empty-image"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p className="no-password">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="list-container">
              {newList.map(each => (
                <li className="list-items" id={each.id} key={each.id}>
                  <p className={`initial ${each.classAdd}`}>
                    {each.initialValue}
                  </p>
                  <div className="list-content">
                    <p className="website">{each.websiteName}</p>
                    <p className="website">{each.userName}</p>
                    {!isShow && (
                      <img
                        className="stars"
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                      />
                    )}
                    {isShow && <p className="website">{each.passwordName}</p>}
                  </div>
                  <button
                    className="del-btn"
                    type="button"
                    onClick={() => this.deleteItem(each.id)}
                    data-testid="delete"
                  >
                    <img
                      className="delete"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
