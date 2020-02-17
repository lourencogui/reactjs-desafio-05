/* eslint-disable react/static-property-placement */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { random } from 'node-forge';
import api from '../../services/api';

import {
  Loading,
  Owner,
  IssueList,
  IssueFilter,
  IssuePaginator,
} from './styles';
import Container from '../../components/Container';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    loadingIssues: false,
    currentPage: 1,
    filter: 'all',
  };

  async componentDidMount() {
    const { match } = this.props;
    const { filter, currentPage } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filter,
          per_page: 5,
          page: currentPage,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  getIssues = async () => {
    try {
      this.setState({ loadingIssues: true });
      const { filter, repository, currentPage } = this.state;
      const { data: issues } = await api.get(
        `/repos/${repository.full_name}/issues`,
        {
          params: {
            state: filter,
            per_page: 5,
            page: currentPage,
          },
        }
      );
      this.setState({ issues });
      this.setState({ loadingIssues: false });
    } catch (error) {
      this.setState({ loadingIssues: false });
    }
  };

  nextPage = async () => {
    const { currentPage } = this.state;
    this.setState({ currentPage: currentPage + 1 });
    await this.getIssues();
  };

  previousPage = async () => {
    const { currentPage } = this.state;
    if (!(currentPage < 2)) {
      this.setState({ currentPage: currentPage - 1 });
      await this.getIssues();
    }
  };

  render() {
    const { repository, loading, issues, currentPage } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar para os repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.name} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueFilter>
          <li>
            <button
              type="button"
              onClick={() => {
                this.setState({ filter: 'all', currentPage: 1 });
                this.getIssues();
              }}
            >
              All
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                this.setState({ filter: 'open', currentPage: 1 });
                this.getIssues();
              }}
            >
              Open
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                this.setState({ filter: 'closed', currentPage: 1 });
                this.getIssues();
              }}
            >
              Closed
            </button>
          </li>
        </IssueFilter>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <IssuePaginator firstPage={currentPage === 1}>
          <span>
            <button type="button" onClick={() => this.previousPage()}>
              <FaArrowLeft size={14} />
            </button>
          </span>
          <span>{currentPage}</span>
          <span>
            <button type="button">
              <FaArrowRight size={14} onClick={() => this.nextPage()} />
            </button>
          </span>
        </IssuePaginator>
      </Container>
    );
  }
}
