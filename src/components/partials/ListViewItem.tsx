import * as React from "react";
import { Link } from "react-router-dom";
import "./ListViewItem.scss";
import {Content} from "../../interfaces";
import { createDescription } from "../../Helpers";

interface ListViewItemProps {
    /**
     * The list view items data
     */
    content: Content;
}

interface State {}

export class ListViewItem extends React.Component<ListViewItemProps, State> {
    public static readonly displayName = "App component";

    constructor(
        props: ListViewItemProps,
        context: any
    ) {
        super(props, context);

        this.state = {};
    }

    public render(): JSX.Element {
        if(this.props.content.portfolio && this.props.content.portfolio.featured) {
            return (
                <div className="ListViewItem with-image animate-on-scroll">
                    <div className={"ListViewItem-img-holder"}>
                        <img src={`http://api.thomaskbird.com/img/${this.props.content.portfolio.featured}`} />
                    </div>
                    <div className={"ListViewItem-content"}>
                        <Link to={`/${this.props.content.slug}`}><h3>{this.props.content.title}</h3></Link>
                        <p>{createDescription(this.props.content.body, 300)}</p>
                        <Link to={`/${this.props.content.slug}`}>Read more...</Link>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="ListViewItem animate-on-scroll">
                    <div className={"ListViewItem-content"}>
                        <Link to={`/${this.props.content.slug}`}><h3>{this.props.content.title}</h3></Link>

                        <p>{createDescription(this.props.content.body, 300)}</p>

                        <Link to={`/${this.props.content.slug}`}>Read more...</Link>
                    </div>
                </div>
            );
        }
    }
}
