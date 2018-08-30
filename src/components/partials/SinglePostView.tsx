import * as React from "react";
import "./SinglePostView.scss";
import {Link} from "react-router-dom";
import {createDescription} from "../../Helpers";

interface SinglePostViewProps {
    /**
     * Section title
     */
    title: string;
    /**
     * The posts title
     */
    postTitle: string;
    /**
     * The posts short content
     */
    content: string;
    /**
     * The posts slug for link
     */
    slug: string;
}

interface State {}

export class SinglePostView extends React.Component<SinglePostViewProps, State> {
    public static readonly displayName = "App component";

    constructor(
        props: SinglePostViewProps,
        context: any
    ) {
        super(props, context);

        this.state = {};
    }

    public render(): JSX.Element {
        return (
            <div className="SinglePostView">
                <h3>{this.props.title}</h3>
                <Link className={"SinglePostView-title-link"} to={`/${this.props.slug}`}>
                    <h5>{createDescription(this.props.postTitle, 20)}</h5>
                </Link>
                <p>{createDescription(this.props.content, 200)}</p>
                <Link to={`/${this.props.slug}`}>Read more...</Link>
            </div>
        );
    }
}
