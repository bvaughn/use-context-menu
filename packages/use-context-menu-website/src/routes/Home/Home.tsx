import Block from "../../components/Block";
import Container from "../../components/Container";
import SubHeading from "../../components/SubHeading";
import { LEFT_CLICK_MENU, RIGHT_CLICK_MENU } from "../config";
import GitHubLink from "./GitHubLink";
import styles from "./Home.module.css";
import { InstallationPanel } from "./InstallationPanel";
import { LinkListItem } from "./LinkListItem";

export default function Route() {
  return (
    <Container>
      <Block>
        <GitHubLink />
        <p>React components for displaying configurable context menus.</p>
      </Block>
      <Block>
        <SubHeading title="Examples" />
        <ul>
          <LinkListItem to={RIGHT_CLICK_MENU.path}>
            {RIGHT_CLICK_MENU.title}
          </LinkListItem>
          <LinkListItem to={LEFT_CLICK_MENU.path}>
            {LEFT_CLICK_MENU.title}
          </LinkListItem>
        </ul>
      </Block>
      <Block>
        <SubHeading title="Installation" />
        <InstallationPanel />
      </Block>
    </Container>
  );
}
