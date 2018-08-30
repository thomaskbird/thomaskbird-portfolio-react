import * as React from "react";
import "./HomeView.scss";

import { Api } from "../../services/Api";
import { HomeData, Skill } from "../../interfaces";
import { SinglePostView } from "../partials/SinglePostView";
import {LoadingIndicator} from "../partials/LoadingIndicator";
import {SkillViewItem} from "../partials/SkillViewItem";
import {EasySlider} from "../partials/EasySlider";

interface HomeViewProps {}

interface State {
  /**
   * Api object
   */
  api: any;
  /**
   * Home page information
   */
  homeData: HomeData | undefined;
  /**
   * Whether the api has completed the request
   */
  isLoading: boolean;
}

export class HomeView extends React.Component<HomeViewProps, State> {
  public static readonly displayName = "App component";

  constructor(props: HomeViewProps, context: any) {
    super(props, context);

    this.state = {
      isLoading: true,
      homeData: undefined,
      api: new Api()
    };
  }

  public componentDidMount(): void {
    this.state.api.get("/home").then((homeData: HomeData) => {
      this.setState({
          homeData: homeData,
          isLoading: false
      });
    });
  }

  public render(): JSX.Element {
    if (this.state.isLoading) {
      return (
          <LoadingIndicator
              isLoading={this.state.isLoading}
          />
      )
    } else {
        return (
            <div>
                <div className={"container-outer slider"}>
                    <div className={"container-inner"}>
                        <EasySlider
                            slides={this.state.homeData!.portfolio.data}
                        />
                    </div>
                </div>

                <div className={"container-outer skills"}>
                    <div className={"container-inner"}>
                        <div className={"skill-column"}>
                            {this.state.homeData!.skills[0].map((skill: Skill, idx: number) => {
                                return (
                                    <SkillViewItem
                                        key={idx}
                                        title={skill.title}
                                        slug={skill.slug}
                                        description={skill.body}
                                    />
                                );
                            })}
                        </div>
                        <div className={"skill-column"}>
                            {this.state.homeData!.skills[1].map((skill: Skill, idx: number) => {
                                return (
                                    <SkillViewItem
                                        key={idx}
                                        title={skill.title}
                                        slug={skill.slug}
                                        description={skill.body}
                                    />
                                );
                            })}
                        </div>
                        <div className={"skill-column"}>
                            {this.state.homeData!.skills[2].map((skill: Skill, idx: number) => {
                                return (
                                    <SkillViewItem
                                        key={idx}
                                        title={skill.title}
                                        slug={skill.slug}
                                        description={skill.body}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className={"container-outer posts"}>
                  <div className={"container-inner"}>

                    <SinglePostView
                      title={"Latest post"}
                      postTitle={this.state.homeData!.post_latest.title}
                      content={this.state.homeData!.post_latest.body}
                      slug={this.state.homeData!.post_latest.slug}
                    />

                    <SinglePostView
                      title={"News"}
                      postTitle={this.state.homeData!.post_news.title}
                      content={this.state.homeData!.post_news.body}
                      slug={this.state.homeData!.post_news.slug}
                    />

                    <SinglePostView
                      title={"Testimonial"}
                      postTitle={this.state.homeData!.post_testimonials.title}
                      content={this.state.homeData!.post_testimonials.body}
                      slug={this.state.homeData!.post_testimonials.slug}
                    />

                  </div>
                </div>
            </div>
        );
    }
  }
}
