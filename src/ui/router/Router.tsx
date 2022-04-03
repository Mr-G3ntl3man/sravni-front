import {Route, Routes} from "react-router-dom";
import {HomePage} from "../component/HomePage";
import {Bank} from "../component/Bank";
import {NotFound} from "../component/NotFound";

export enum PATH {
   HOME = '/',
   BANK = '/:id',
}

export const Router = () => (
   <Routes>
      <Route path={PATH.HOME} element={<HomePage/>}/>
      <Route path={PATH.BANK} element={<Bank/>}/>
      <Route path={'*'} element={<NotFound/>}/>
   </Routes>
)