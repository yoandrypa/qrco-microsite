import React from "react";
import styles from "./layout.module.css"

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({children}): JSX.Element => {
    return <div className={styles.container}>{children}</div>
};

export default Layout
