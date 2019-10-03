import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 30px;

  img {
    width: 100px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    max-width: 400px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
  }

  a {
    text-decoration: none;
    color: #7159c1;
    font-size: 16;
  }
`;

export const IssueList = styled.ul`
  /* margin-top: 30px; */
  /* padding-top: 10px; */
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const IssueFilter = styled.ul`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  list-style: none;
  /* padding: 15px 0px; */
  margin: 15px 0px;
  border: 1px solid #eee;

  li {
    flex: 1;
    padding: 15px;
    text-align: center;

    button {
      border: 0;
      background: #fff;
      font-size: 14px;
      font-weight: 600;
      &:hover {
        color: #7159c1;
      }
    }

    & + li {
      border-left: 1px solid #eee;
    }
  }
`;

export const IssuePaginator = styled.div`
  flex: 1;
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  span {
    padding: 10px;

    button {
      border: 0;
      background: transparent;
      align-items: center;
      &:hover {
        color: #7159c1;
      }
    }
  }

  span:nth-child(2) {
    color: #7159c1;
    font-weight: bold;
    font-size: 14px;
  }
`;
