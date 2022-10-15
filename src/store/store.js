import {applyMiddleware, combineReducers,  createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from "redux-thunk";
import MainReducer from "./Main/MainReducer";
import BookReducer from "./Book/BookReducer";
import ProfileReducer from "./Profile/ProfileReducer";
import AuthReducer from "./Auth/AuthReducer";
import ChapterReducer from "./Chapter/ChapterReducer";
import AddBookReducer from "./Profile/AddBookReducer";
import BookListReducer from "./Profile/BookListReducer";
import EditBookReducer from "./Book/EditBookReducer";
import EditChapterReducer from "./Chapter/EditChapterReducer";
import MyLibraryReducer from "./Profile/MyLibraryReducer";
import ModerationReducer from "./Profile/ModerationReducer";
import SearchReducer from "./Search/SearchReducer";
import UserReducer from "./User/UserReducer";
import AdvertisingReducer from "./Advertising/AdvertisingReducer";
import StatisticsReducer from "./Statistics/StatisticsReducer";
import ProfileBlogReducer from "./Profile/ProfileBlogReducer";
import UserBlogReducer from "./Blog/UserBlogReducer";



let reducers = combineReducers({
    PopularReducer: MainReducer,
    BookReducer,
    ProfileReducer,
    AuthReducer,
    ChapterReducer,
    AddBookReducer,
    BookListReducer,
    EditBookReducer,
    EditChapterReducer,
    MyLibraryReducer,
    ModerationReducer,
    SearchReducer,
    UserReducer,
    AdvertisingReducer,
    StatisticsReducer,
    BlogReducer: ProfileBlogReducer,
    UserBlogReducer
});





const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunkMiddleware)
));


window.__store__ = store;

export default store;