import React, {Suspense} from 'react';
import Preloader from "../components/common/Preloader/Preloader";

export function withSuspense<WCP>(Component: React.ComponentType<WCP>){
    return ((props: WCP) => {
            return (
                <Suspense fallback = {<Preloader/>}>
                    <Component {...props} />
                </Suspense>
            );
        }
    );
}
