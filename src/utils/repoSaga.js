import { put, takeLatest } from "redux-saga/effects";
import { STARRED_REPO_API } from "../utils/constant";
import { addRepo } from "./Store/Slice/repoSlice";

function* fetchReposData() {
  try {
    console.log("API call started");
    let data = yield fetch(STARRED_REPO_API + "&page=2");
    data = yield data.json();
    console.log("API call success", data.items);
    yield put(addRepo(data.items));
  } catch (error) {
    console.error("API call error", error);
  }
}

function* repoSaga() {
  console.log("repoSaga started");
  // yield takeLatest("repository/addRepo", fetchReposData);
}

export default repoSaga;
