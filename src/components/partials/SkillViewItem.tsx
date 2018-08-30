import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SkillViewItem.scss";

import { createDescription } from "../../Helpers";
import {Link} from "react-router-dom";

interface SkillViewItemProps {
    /**
     * The current skills title
     */
    title: string;
    /**
     * The current skills slug
     */
    slug: string;
    /**
     * The current skills description
     */
    description: string;
}

interface State {
    /**
     * Defines whether the description is visible
     */
    isOpen: boolean;
}

export class SkillViewItem extends React.Component<SkillViewItemProps, State> {
    public static readonly displayName = "App component";

    constructor(
        props: SkillViewItemProps,
        context: any
    ) {
        super(props, context);

        this.state = {
            isOpen: false
        };
    }

    public render(): JSX.Element {
        return (
            <div className={"SkillViewItem"}>
                <h3 onClick={() => {
                    this.toggleDescription();
                }} className={"SkillViewItem-title"}>
                    {createDescription(this.props.title, 15)}
                    <FontAwesomeIcon icon={this.state.isOpen ? "chevron-up" : "chevron-down"} />
                </h3>
                <div className={this.state.isOpen ? `SkillViewItem-description open` : `SkillViewItem-description`}>
                    {createDescription(this.props.description, 200)}
                    <Link to={`/${this.props.slug}/skill`}>Read more...</Link>
                </div>
            </div>
        );
    }

    private toggleDescription(): void {
        const bool = this.state.isOpen ? false : true;
        this.setState({ isOpen: bool });
    }
}
