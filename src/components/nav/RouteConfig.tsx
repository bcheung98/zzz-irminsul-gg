import { Routes, Route } from "react-router";

import Layout from "components/Layout";
import Home from "components/home/Home";
import PageNotFound from "components/PageNotFound";
import CharacterBrowser from "components/characters/browser/_CharacterBrowser";
import CharacterPage from "components/characters/page/_CharacterPage";
import WeaponBrowser from "components/weapons/browser/_WeaponBrowser";
import WeaponPage from "components/weapons/page/_WeaponPage";
import BangbooBrowser from "components/bangboos/browser/_BangbooBrowser";
import BangbooPage from "components/bangboos/page/_BangbooPage";
import DriveDiscBrowser from "components/drivediscs/browser/_DriveDiscBrowser";
import DriveDiscPage from "components/drivediscs/page/_DriveDiscPage";
import Planner from "components/planner/_Planner";
import BannerArchive from "components/banners/_BannerArchive";

function RouteConfig() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/agents" element={<CharacterBrowser />} />
                <Route path="/agents/:name" element={<CharacterPage />} />
                <Route path="/w-engines" element={<WeaponBrowser />} />
                <Route path="/w-engines/:name" element={<WeaponPage />} />
                <Route path="/bangboos" element={<BangbooBrowser />} />
                <Route path="/bangboos/:name" element={<BangbooPage />} />
                <Route path="/drive-discs" element={<DriveDiscBrowser />} />
                <Route path="/drive-discs/:name" element={<DriveDiscPage />} />
                <Route path="/planner" element={<Planner />} />
                <Route path="/banners" element={<BannerArchive />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    );
}

export default RouteConfig;
