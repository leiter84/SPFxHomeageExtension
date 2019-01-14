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
    require("./CustomOverrides.scss");
    const titleBarElement: any = document.querySelectorAll(
      "div[class^='mainRow']"
    )[0];
    const jiraDivElement: any = document.createElement("div");
    jiraDivElement.classList.add(styles.customLinks);
    jiraDivElement.innerHTML = `
      <div>
        <a href="https://confluence.it.volvo.net/pages/viewpage.action?pageId=30770415">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOwAAAAwCAMAAAAl8WZyAAAAMFBMVEX///////////////////////////////////////////////////////////////9Or7hAAAAAEHRSTlMAESIzRFVmd4iZqrvM3e7/dpUBFQAABApJREFUeNrtme22nCoMQANECETI+7/tPSpDcHBqndPbszrL/aeKFLMJH3IGbm5u/j0smksPLX4B72ICi0hhMgCevkD4m0SR5C0c4MIsQtCBcZbKnMjCZXyRSgDcLuBvQlvsOMSVZQE7+Vl2MFwFpYE/IjvJSl7FeWVaxptsWLUX+a5s11vuR2RBNhbDuF36lnCZNa9FnohwEScK/Ixsqqk1ALYl2bap9YDlGYKL+NomoscfkkWNfcsnqloxULFSmTkxc9kGwDWoG/0/JAvcDWSu0kPyfFW1UHEI/56sTqXiAMwcm5kmVvUtHGDwCwfHWPM9WXdlXzduDOwpZFLb/Q4xPdfJBzI01/+d/KMuM8d1o+ayPCDza1nkhcVouElFVtjr07QkxW9bfnIaB9fBF6dakLeCTL2vmWVjNrt1N70agkN5JTtd3zHkVj7XdVDJvSzplNndGB7apvXhVBvTBJm++bKUBOnwoLiitnqTzblslD1ulR0Iw2p+KltzoBRbnyq6Oe6qcl9xtPXSbF3RPjuVDaLoLJeB+brs2JFRHXrcUExb40NcQ9S56AfduWw53Hxl5A1ZOzRiD2XDEAe1TCthGI9D4k9kJ9mIRG01OJbF63M21EHhEVMN6VCW2n6SA+IUIttHRxVCDOUg8ji4nsuS1m2ps022xKnFgUMbp7Ks469ek8rO3nalQavusuC7KQqjrbqeyHZ+efcCfMjWDeebsrF/e7twu6pjcNQJGr0+tg1wQXYr1Byq37dkcysdZAkuyIJe97Aunm/Iwh+WlYHLssooqxub+3xZtc3mw2WT72zpQ2X1ue++FfGTZc1i6fQ7a74sa/4X2YiKuSqLiq5CjmKun8O6bcfgBlkxr2XxD8vyOJ+uysLAFMvuCDFLI8fmG/RjfGjT9jfuDdnWtPEse9n592Xzi8AUytJRahBK9vs/ZzAh4kSUmF37fJ0ALMkGvCtbiFgeUPvGCWarHZJ/KYs1E2tVRPMo4M3W+RiXf1RVW2HZwdvbtKZWtjKQ3pIdoP7YyTpdjmXNcMJpuWIuW5K3tbdEjyBd3v1DEkMq9UTfvXvs/R58QxYPZU0R5ezoexrYtExPxm6Qzv2yWtqvIPH4EMgHARFclX15LB67172UteUpMDsG1iY1St8I92uZbeHRIDvMgwhvyZIoaa6RjC/EY9nh94pZC7pg+RGS2x12Yn88DLr8u7hrcq1tSMt4gpXcf18XvQmtQ/SdZdePHCx4jQT5+X1B49Sb5zjSWtAHm8mto5AM/AKb6pytOB9WJtQyDBSZyFt4Hxu+wIPyiYiZqD0bGGLDR7gGiRJHIrTtL5CFXkbpoo6ZTwBj/XV2JGTtiU/B+FQOs5dynODm5ubm5ubm5pT/AGmqzdoC5N1sAAAAAElFTkSuQmCC" 
            alt="Confluence"
            target="_blank"
          />
        </a>
      </div>
      <div>
        <a href="https://jira.it.volvo.net/secure/Dashboard.jspa">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG8AAAAeCAYAAAAiu0AEAAACTElEQVR42u2au23DMBCGPQLrVKpSC0gdwE3KABpBZUqNoBG0QbiBBWSAeANrA2uAAPIGCulc4MMP8uzEsMBc+AN/YT4MHb/jQ4/VPM/Zf9T/fgAyvOx04Qny9S/zl15WOqQKnghqZgq1y/BSgcd0KdAML9GZh8ozL1l455X3vDRPm61z7Xz3i4F4cu6cK98/g1wa3kkHZ+tsKDDjvGYuWdDNsf1Jbxyeb+vMtWZ1W1beQ59zGilZjACkdUZ1WuH1EGhLgRVQbhnUA9Q9A7z1hfC20EcUJFoZATKGoGuFVwUGpqDgLJVNrAxhvzvf+7ol4EFfLkw4VKkOHgWxg0AHZ+NNdTW1q2cSgrkBvAaW7cp5kG5VqE9MnTZ40n7TQ6CVMCA3gBdMilZqA3A3R5806oMnZ61lcHGf2zmbBODFlsyKzFWqggfBvDqjBg4O98CE4GHyGSrnahXCkwEiOMjgReB5GNB3xiUz8r89T0S98GSAMrjlT5uDsGQ2wowsVMPDEygeUBKBV0qAZLD64ZkAwEMCM2+Aa8ClcY9l2F/znld/Q4oA3C4Ezzq3ZIRnIMm4OiqTVGiFN7LniIYgThB8veSBJQDQQrIx0Q29rEYNPGEgbGRPGc/Aq25w2hwwgQLL47SKCBJw0AivxwFidfvQ0oPy5YGBLq+BJzwoeITfvQDPQlujDR7qgdV1MbChNniAuAaecKr8EK9JXlVqbfCmHzzbbOQBwvvCy9/nITyhP8oI8AzEZ/NnEPFXMhsPJL89zx/d5o9uszO87AX8CfhSN/95Sk4ZAAAAAElFTkSuQmCC" 
            alt="Jira"
            target="_blank"
          />
        </a>
      </div>
    `;
    titleBarElement.appendChild(jiraDivElement);

    return Promise.resolve();
  }
}
