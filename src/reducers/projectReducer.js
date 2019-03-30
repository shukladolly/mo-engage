export default function reducer(
  state = {
    projectInfo: []
  },
  action
) {
  switch (action.type) {
    case "PROJECT_INFO":
      {
        return {
          ...state,
          projectInfo: action.projectInfo
        };
      }
      break;

    case "PROJECT_ERROR":
      {
        throw new Error("Unable to fetch project info!!");
      }
      break;
  }
  return state;
}
