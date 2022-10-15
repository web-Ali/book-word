import {
    ADD_CHAPTER_ROUTER, BLOG_ROUTE,
    BOOK_ROUTE, EDIT_BOOK_ROUTE, EDIT_CHAPTER_ROUTER,
    LOGIN_ROUTE,
    MAIN_ROUTE, OUR_MISSION_ROUTER, PRIVACY_POLICY_ROUTER,
    PROFILE_ROUTE, PUBLIC_OFFER_ROUTER,
    READER_ROUTER,
    REGISTRATION_ROUTE, SEARCH_BLOG_ROUTER, SEARCH_BOOK_ROUTER, SEARCH_USER_ROUTER, STATS_ALL_ROUTER,
    USER_ROUTE, VERIFY_ACCOUNT_ROUTER
} from "./consts";
import Main from "../pages/Main/Main";
import Login from "../pages/Registration/Login";
import Profile from "../pages/Profile/Profile";
import User from "../pages/User/User";
import Registration from "../pages/Registration/Registration";
import Book from "../pages/Book/Book";
import Chapter from "../pages/Chapter/Chapter";
import AddChapter from "../pages/Chapter/AddChapter";
import EditBook from "../pages/Book/EditBook";
import EditChapter from "../pages/Chapter/EditChapter";
import SearchBooks from "../pages/Search/SearchBooks";
import SearchUser from "../pages/Search/SearchUser";
import Blog from "../pages/Blog/Blog";
import SearchBlog from "../pages/Search/SearchBlog";
import PrivacyPolicy from "../pages/Docs/PrivacyPolicy";
import PublicOffer from "../pages/Docs/PublicOffer";
import OurMission from "../pages/Docs/OurMission";
import Verify from "../pages/Registration/Verify";
import StatsPageContainer from "../containers/Statistics/StatsPageContainer";



export const authRoutes = [
    // {
    //     path: MY_BOOKS_ROUTER,
    //     Component: MyBooks
    // },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },

    {
        path: ADD_CHAPTER_ROUTER + '/:bookid',
        Component: AddChapter
    },
    {
        path: EDIT_BOOK_ROUTE + '/:id',
        Component: EditBook
    },
    {
        path: EDIT_CHAPTER_ROUTER + '/:bookid/:chapterid',
        Component: EditChapter
    },
    {
        path: STATS_ALL_ROUTER,
        Component: StatsPageContainer
    },
]
export const noAuthRoutes = [

    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    {
        path: VERIFY_ACCOUNT_ROUTER + '/:code',
        Component: Verify
    }
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: SEARCH_BOOK_ROUTER + '/:form?/:genre?/:search?/:tags?/:paid?',
        Component: SearchBooks
    },
    {
        path: SEARCH_BLOG_ROUTER + '/:themes?/:search?',
        Component: SearchBlog
    },
    {
        path: SEARCH_USER_ROUTER + '/:sort?/:search?',
        Component: SearchUser
    },
    {
        path: READER_ROUTER + '/:bookid/:chapterid',
        Component: Chapter
    },
    {
        path: USER_ROUTE + '/:id',
        Component: User
    },
    {
        path: BOOK_ROUTE + '/:id',
        Component: Book
    },
    {
        path: BLOG_ROUTE + '/:id',
        Component: Blog
    },
    {
        path: PRIVACY_POLICY_ROUTER,
        Component: PrivacyPolicy
    },
    {
        path: PUBLIC_OFFER_ROUTER,
        Component: PublicOffer
    },
    {
        path: OUR_MISSION_ROUTER,
        Component: OurMission
    }
]