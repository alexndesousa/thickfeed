/* eslint-disable no-nested-ternary */
import * as React from 'react';
import '../styles/cardsStyle.css';
import '../styles/githubMarkdown.css';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown';
import LazyLoad from 'react-lazyload';
import redditLogo from '../assets/Reddit_Mark_OnWhite.png';
import { formatUTC } from '../utils/utils';

export interface RedditData {
  title: string,
  selftext: string,
  subredditNamePrefixed: string,
  author: string,
  createdUtc: number,
  ups: number,
  numComments: number,
  urlOverridenByDest: string,
  permalink: string,
  postHint: string,
  width: number,
  height?: number,
}

interface RedditFooterData {
  author: string,
  subredditNamePrefixed: string,
  ups: number,
  numComments: number,
  createdUtc: number,
  baseUrl: string
}

const theme = createMuiTheme({
  typography: {
    overline: {
      fontSize: 8,
    },
  },
});

const RedditCardFooter = ({
  author, subredditNamePrefixed, ups, numComments, createdUtc, baseUrl,
}: RedditFooterData) => {
  const prefixedSubreddit = subredditNamePrefixed;
  const subredditLink = `${baseUrl}${prefixedSubreddit}`;
  const currentUtc = new Date().getTime() / 1000;
  const points = `${ups} points`;
  const comments = `${numComments} comments`;
  const formattedUTC = formatUTC(currentUtc - createdUtc);
  const separator = ' • ';
  return (
    <Grid container style={{ marginTop: '0.55em' }}>
      <Grid item style={{ marginRight: '0.36em', marginTop: '-0.18em' }}>
        <CardActionArea href={baseUrl} target="_blank">
          <img
            src={redditLogo}
            alt="reddit logo"
            className="reddit-footer-logo-image"
            style={{ marginBottom: '-0.36em' }}
          />
        </CardActionArea>
      </Grid>
      <Grid item direction="column" style={{ marginBottom: '-0.18em' }}>
        <Grid item style={{ marginTop: '-0.60em', marginBottom: '-0.60em' }}>
          <Typography display="inline" variant="body2">
            <Link color="textPrimary" href={subredditLink} target="_blank" rel="noreferrer">
              {subredditNamePrefixed}
            </Link>
          </Typography>
          <Typography display="inline" variant="body2" color="textSecondary">
            {separator}
            <Link color="textSecondary" href={`${baseUrl}/u/${author}`} target="_blank" rel="noreferrer">
              {author}
            </Link>
            {separator}
            {formattedUTC}
          </Typography>
        </Grid>
        <Grid item style={{ marginTop: '-0.18em', marginBottom: '-0.55em' }}>
          <ThemeProvider theme={theme}>
            <Typography variant="caption" color="textSecondary">
              {points}
              {separator}
              {comments}
            </Typography>
          </ThemeProvider>
        </Grid>

      </Grid>

    </Grid>
  );
};

interface RedditBodyData {
  urlOverridenByDest: string,
  selftext: string,
  postHint: string,
}

const RedditCardBody = ({ urlOverridenByDest, selftext, postHint }: RedditBodyData) => (
  <div>
    {urlOverridenByDest === ''
      ? (
        <Typography>
          <ReactMarkdown className="markdown-body">
            {selftext}
          </ReactMarkdown>
        </Typography>
      )
      : (postHint === 'image'
        ? <img src={urlOverridenByDest} alt="embedded" style={{ objectFit: 'contain', width: '100%' }} />
        : (
          <Typography variant="body1">
            <Link href={urlOverridenByDest} target="_blank" rel="noreferrer">
              {urlOverridenByDest}
            </Link>
          </Typography>
        )
      )}
  </div>
);

export const RedditCard = ({
  permalink, title, subredditNamePrefixed, selftext, author, createdUtc, ups, numComments,
  urlOverridenByDest, postHint,
}: RedditData): JSX.Element => {
  const baseUrl = 'https://www.reddit.com';
  const postLink = `${baseUrl}${permalink}`;
  const postTitle = title;
  return (
    <Card className="card-container-reddit">
      <LazyLoad>
        <CardActionArea href={postLink} target="_blank">
          <CardHeader
            title={postTitle}
            style={{ marginBottom: '-0.55em' }}
          />
          <CardContent>
            <RedditCardBody
              urlOverridenByDest={urlOverridenByDest}
              selftext={selftext}
              postHint={postHint}
            />
            <RedditCardFooter
              author={author}
              subredditNamePrefixed={subredditNamePrefixed}
              ups={ups}
              numComments={numComments}
              createdUtc={createdUtc}
              baseUrl={baseUrl}
            />
          </CardContent>
        </CardActionArea>
      </LazyLoad>
    </Card>
  );
};
