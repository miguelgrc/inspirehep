import React, { useMemo } from 'react';
import RcFooter from 'rc-footer';
import 'rc-footer/assets/index.css';
import { Row, Col } from 'antd';

import './Footer.less';
import {
  INSPIRE_TWITTER_ACCOUNT,
  ABOUT_INSPIRE_URL,
  CONTENT_POLICY_URL,
  PRIVACY_NOTICE_URL,
  TERMS_OF_USE_URL,
  FAQ_URL,
  HELP_BLOG_URL,
  BLOG_URL,
  HOLDINGPEN_URL,
  AUTHORLIST_TOOL_URL,
  INVENIO_URL,
  REPORT_METADATA_URL,
  CONTACT_URL,
  INSPIRE_BLUESKY_ACCOUNT,
} from '../../constants';
import LinkWithTargetBlank from '../../components/LinkWithTargetBlank';
import { BIBLIOGRAPHY_GENERATOR } from '../../routes';

interface Column {
  title: string;
  items: [
    {
      title: string;
      url: string;
      openExternal: boolean;
      onlyCatalogers: boolean;
    },
  ];
}

const COLUMNS = [
  {
    title: 'INSPIRE',
    items: [
      {
        title: 'About INSPIRE',
        url: ABOUT_INSPIRE_URL,
        openExternal: true,
      },
      {
        title: 'Content Policy',
        url: CONTENT_POLICY_URL,
        openExternal: true,
      },
      {
        title: 'Privacy Notice',
        url: PRIVACY_NOTICE_URL,
        openExternal: true,
      },
      {
        title: 'Terms of Use',
        url: TERMS_OF_USE_URL,
        openExternal: true,
      },
    ],
  },
  {
    title: 'Help',
    items: [
      {
        title: 'FAQ',
        url: FAQ_URL,
        openExternal: true,
      },
      {
        title: 'INSPIRE Help',
        url: HELP_BLOG_URL,
        openExternal: true,
      },
      {
        title: 'Report metadata issues',
        url: REPORT_METADATA_URL,
        openExternal: false,
      },
    ],
  },
  {
    title: 'Tools',
    items: [
      {
        title: 'Holdingpen',
        onlyCatalogers: true,
        url: HOLDINGPEN_URL,
        openExternal: true,
      },
      {
        title: 'Author list',
        onlyCatalogers: true,
        url: AUTHORLIST_TOOL_URL,
        openExternal: true,
      },
      {
        title: <span>Bibliography generator</span>,
        url: BIBLIOGRAPHY_GENERATOR,
        openExternal: false,
      },
    ],
  },
  {
    title: 'Community',
    items: [
      {
        title: 'Blog',
        url: BLOG_URL,
        openExternal: true,
      },
      {
        title: 'Bluesky',
        url: INSPIRE_BLUESKY_ACCOUNT,
        openExternal: true,
      },
      {
        title: 'X',
        url: INSPIRE_TWITTER_ACCOUNT,
        openExternal: true,
      },
      {
        title: 'Contact',
        url: CONTACT_URL,
        openExternal: true,
      },
    ],
  },
];

const BOTTOM = (
  <Row>
    <Col className="tl sm-tc" xs={24} md={12}>
      <LinkWithTargetBlank href={INVENIO_URL}>
        Powered by Invenio
      </LinkWithTargetBlank>
    </Col>
    <Col className="tr sm-tc" xs={24} md={12}>
      Made with <span className="red">❤</span> by the INSPIRE Team
    </Col>
  </Row>
);

function Footer({ isCatalogerLoggedIn }: { isCatalogerLoggedIn: boolean }) {
  const columns = useMemo(
    () =>
      isCatalogerLoggedIn
        ? COLUMNS
        : (COLUMNS as Column[]).map((col) => ({
            ...col,
            items: col.items.filter((item) => !item.onlyCatalogers),
          })),
    [isCatalogerLoggedIn]
  );
  return <RcFooter className="__Footer__" bottom={BOTTOM} columns={columns} />;
}

export default Footer;
