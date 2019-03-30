import React, { Component } from "react";
import "../App.css";
import { connect } from "react-redux";
// import SearchInfo from "../components/SearchInfo";
import { getProjectProfile, updateProjectInfo } from "../actions/projectAction";
import Modal from "../components/Modal";
class ProjectInfo extends Component {
  searchFiltered = arr => {
    this.setState({
      filterArr: arr
    });
  };

  constructor(props) {
    var arrKeywords = [];
    super(props);
    this.state = {
      projectInfo: [],
      showDeleteMessage: true,
      showModal: true
    };
  }

  handleChange = e => {
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      currentList = this.state.projectInfo;
      newList = currentList.filter(item => {
        const lc = item.name.toLowerCase();
        // change search term to lowercase
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = this.props.project;
    }
    this.setState({
      projectInfo: newList
    });
    //  this.props.updateProjectInfo(newList);
  };

  handleDelete = e => {
    let currentList = [];
    let newList = [];
    console.log("e.target.id ", e.target.id);

    newList = this.state.projectInfo.filter(function(item) {
      return item._id != e.target.id;
    });
    console.log("here newList ", newList);
    this.setState({
      showDeleteMessage: true
    });

    this.props.updateProjectInfo(newList);
  };

  handlePagination = e => {
    let currentList = [];
    let newList = [];

    console.log(e.target.id);

    if ((e.target.id = "2")) {
      newList = this.state.projectInfo.slice(51, 100);
    } else if ((e.target.id = "1")) {
      newList = this.state.projectInfo.slice(0, 49);
    }
    this.props.updateProjectInfo(newList);
    // newList = this.state.projectInfo.filter(function(item) {
    //   return item._id != e.target.id;
    // });
    // console.log("here newList ", newList);
    // this.setState({
    //   showDeleteMessage: true
    // });

    this.props.updateProjectInfo(newList);
  };

  componentWillMount() {
    this.props.getProjectProfile();
    // this.setState({
    //   projectInfo: this.props.project
    // });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.project != this.props.project) {
      this.setState({
        projectInfo: this.props.project
      });
    }
  }

  render() {
    let projectInformation = this.state.projectInfo;
    console.log("projectInformation ", projectInformation);
    const page = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const pagination = page.map((item, index) => (
      <div>
        <ul onClick={this.handlePagination}>
          <li id={item}>
            <button> {item}</button>
          </li>
        </ul>
      </div>
      // <div className="page-items">
      //   <div>
      //     <button onClick>{item}</button>
      //   </div>
      // </div>
    ));

    const projectInfo =
      //    this.state.projectInfo &&
      projectInformation &&
      projectInformation.map((d, index) => (
        <div className="project-info">
          <input className="combined-shape" type="checkbox" />

          <label>{d.name}</label>
          <label>{d.type}</label>
          <label>{d.company}</label>
          {/* <button name={d._id} onClick={e => this.handleDelete(e)}> */}
          <button id={d._id} onClick={this.handleDelete}>
            X
          </button>
          <button id={d._id} onClick={this.handleEdit}>
            Edit
          </button>
          <hr />
        </div>
      ));

    return (
      <div>
        <div className="popup">
          {/* <Modal show={this.state.showModal} onClose={this.toggleModal}>
            Here's some content for the modal
          </Modal> */}

          {/* <div className="popup_inner">
            <h1>List item Deleted Successfully!</h1>
          </div> */}
        </div>
        <div>
          <input
            className="search"
            align="left"
            type="text"
            onChange={e => this.handleChange(e)}
            placeholder="Search..."
          />
        </div>
        <div>
          <ul class="nav">
            <li>NAME</li>
            <li>TYPE</li>
            <li>COMPANY</li>
          </ul>
          <hr />
        </div>
        {projectInfo}

        <div>
          <ul id="list">
            <li>
              <button id={1} onClick={this.handlePagination}>
                {" "}
                1
              </button>
            </li>
            <li>
              <button id={2} onClick={this.handlePagination}>
                {" "}
                2
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProjectProfile: () => {
      dispatch(getProjectProfile());
    },
    updateProjectInfo: newList => {
      dispatch(updateProjectInfo(newList));
    }
  };
};

const mapStateToProps = state => {
  console.log("state of project container", state);
  return {
    project: state.project.projectInfo
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectInfo);
