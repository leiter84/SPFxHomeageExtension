import { override } from "@microsoft/decorators";
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from "@microsoft/sp-application-base";

import styles from "./HomepageApplicationCustomizer.module.scss";

export interface IHomepageApplicationCustomizerProperties {}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HomepageApplicationCustomizer extends BaseApplicationCustomizer<
  IHomepageApplicationCustomizerProperties
> {
  @override
  public onInit(): Promise<void> {
    require("./CustomOverrides.module.scss");
    const titleBarElement: any = document.querySelectorAll(
      "div[class^='mainRow']"
    )[0];

    const existingJiraDivs: NodeListOf<Element> = document.querySelectorAll(
      `div[class=${styles.customLinks}`
    );
    if (existingJiraDivs.length === 0) {
      const jiraDivElement: any = document.createElement("div");
      jiraDivElement.classList.add(styles.customLinks);
      jiraDivElement.innerHTML = `
      <div>
        <a href="https://apps.volvogroup.com/" target="_blank">
          <span>App Portal</span>
        </a>
      </div>
      <div>
        <a href="https://confluence.it.volvo.net/pages/viewpage.action?pageId=30770415" target="_blank">
          <span>Confluence</span>
        </a>
      </div>
      <div>
        <a href="https://jira.it.volvo.net/secure/Dashboard.jspa" target="_blank">
          <span>JIRA</span>
        </a>
      </div>
    `;
      titleBarElement.appendChild(jiraDivElement);
    }

    return Promise.resolve();
  }
}
