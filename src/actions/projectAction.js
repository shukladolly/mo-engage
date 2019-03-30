export function getProjectProfile() {
  return dispatch => {
    return fetchProjectProfile().then(([response, json]) => {
      if (response.status === 200) {
        dispatch(fetchProjectSuccess(json));
      } else {
        dispatch(fetchProjectError(json));
      }
    });
  };

  function fetchProjectProfile() {
    return fetch("http://www.mocky.io/v2/5c9f23d5300000974bee991f", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => Promise.all([response, response.json()]));
  }

  function fetchProjectSuccess(projectInfo) {
    return {
      type: "PROJECT_INFO",
      projectInfo
    };
  }

  function fetchProjectError(json) {
    return {
      type: "PROJECT_ERROR",
      json
    };
  }
}

export function updateProjectInfo(projectInfo) {
  console.log("in action newList ", projectInfo);
  return {
    type: "PROJECT_INFO",
    projectInfo
  };
}
