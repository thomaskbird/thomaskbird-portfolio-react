import * as React from "react";
import "./ServiceViewItem.scss";

import {Service} from "../../interfaces";
import {createDescription} from "../../Helpers";
import {Link} from "react-router-dom";

interface ServiceViewItemProps {
    /**
     * The services data
     */
    service: Service;
}

interface State {
}

export class ServiceViewItem extends React.Component<ServiceViewItemProps, State> {
    public static readonly displayName = "App component";

    constructor(props: ServiceViewItemProps, context: any) {
        super(props, context);

        this.state = {};
    }

    public render(): JSX.Element {
        return (
            <div className={"ServiceViewItem"}>
                <Link to={`/${this.props.service.slug}/service`}><h3>{this.props.service.title}</h3></Link>
                <p>{createDescription(this.props.service.body, 150)}</p>
            </div>
        );
    }
}
