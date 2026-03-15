import { routeConfig } from "@/shared/config/routeConfig/routeConfig";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// import { PageLoader } from 'shared/ui/PageLoader/PageLoader';

const AppRouter = () => {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <Routes>
                {Object.values(routeConfig).map(({ path, element }) => (
                    <Route
                        key={path}
                        path={path}
                        element={<div className="page-wrapper">{element}</div>}
                    />
                ))}
            </Routes>
        </Suspense>
    );
};

export default AppRouter;
