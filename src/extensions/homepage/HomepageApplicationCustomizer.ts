import { override } from "@microsoft/decorators";
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName,
  PlaceholderProvider
} from "@microsoft/sp-application-base";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

import styles from "./HomepageApplicationCustomizer.module.scss";
import placeholderStyles from "./Placeholder.module.scss";

export interface IHomepageApplicationCustomizerProperties {}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HomepageApplicationCustomizer extends BaseApplicationCustomizer<
  IHomepageApplicationCustomizerProperties
> {
  private _topPlaceholder: PlaceholderContent | undefined = undefined;
  private _topMessage: string = `
          Hello!
          You are visiting MCoE page. We are heavily working on it so expect appearing changes. \
          Stay tuned with us to see what's coming!
        `;

  private _renderPlaceholder(): void {
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: () => {} }
      );

      if (
        this._topPlaceholder &&
        this._topPlaceholder.domElement &&
        !this._topPlaceholder.domElement.innerHTML
      ) {
        this._topPlaceholder.domElement.innerHTML = `
          <div class="${placeholderStyles.app}">
                        <div class="${placeholderStyles.top}">
                            <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${
                              this._topMessage
                            }
                        </div>
                    </div>`;
      }
    }
  }

  @override
  public async onInit(): Promise<any> {
    require("./CommonCustomOverrides.module.scss");
    this._renderPlaceholder();

    const response: SPHttpClientResponse = await this.context.spHttpClient.get(
      this.context.pageContext.web.absoluteUrl +
        "/_api/web/lists/GetByTitle('VolvoSPFxPermissions')/Items",
      SPHttpClient.configurations.v1
    );
    const jsonItems = await response.json();
    const permissions = jsonItems.value;

    /* Business users shouldn't see any records from Permissions list */
    if (permissions.length === 0) {
      require("./BusinessCustomOverrides.module.scss");
    }
    /* CoE Members should see just one record from Permissions list */
    if (permissions.length === 1) {
      require("./MemberCustomOverrides.module.scss");
    }

    const titleBarElement: any = document.querySelectorAll(
      "div[class^='mainRow']"
    )[0];

    const existingJiraDivs: NodeListOf<Element> = document.querySelectorAll(
      `div[class=${styles.customLinks}`
    );
    if (existingJiraDivs.length === 0) {
      const jiraDivElement: any = document.createElement("div");
      jiraDivElement.classList.add(styles.customLinks);

      const logoPath =
        this.context.pageContext.web.absoluteUrl +
        "/SiteAssets/_mcoe_logotype_black.png";

      jiraDivElement.innerHTML = `
      <div>
        <img src="${logoPath}" />
      </div>
      <div>
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
      </div>
    `;
      titleBarElement.appendChild(jiraDivElement);
    }

    return Promise.resolve();
  }
}
