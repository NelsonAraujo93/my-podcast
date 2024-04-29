import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '@/app/page';

const fakePodcast = {
  createdAt: new Date(),
  "im:name": {
    label: "Fake Podcast",
  },
  "im:image": [
    {
      label: "https://example.com/image.jpg",
      attributes: {
        height: "100",
      },
    },
    {
      label: "https://example.com/image.jpg",
      attributes: {
        height: "100",
      },
    },
    {
      label: "https://example.com/image.jpg",
      attributes: {
        height: "100",
      },
    },
  ],
  summary: {
    label: "This is a fake podcast",
  },
  "im:price": {
    label: "$0.00",
    attributes: {
      amount: "0.00",
      currency: "USD",
    },
  },
  "im:contentType": {
    attributes: {
      term: "Podcast",
      label: "Podcast",
    },
  },
  rights: {
    label: "All rights reserved",
  },
  title: {
    label: "Fake Podcast",
  },
  link: {
    attributes: {
      rel: "alternate",
      type: "text/html",
      href: "https://example.com/podcast",
    },
  },
  id: {
    label: "123456789",
    attributes: {
      "im:id": "123456789",
    },
  },
  "im:artist": {
    label: "Fake Artist",
    attributes: {
      href: "https://example.com/artist",
    },
  },
  category: {
    attributes: {
      "im:id": "123",
      term: "Technology",
      scheme: "https://example.com",
      label: "Technology",
    },
  },
  "im:releaseDate": {
    label: "2024-04-30T00:00:00-07:00",
    attributes: {
      label: "April 30, 2024",
    },
  },
};

describe('Page', () => {
  it('renders a podcast', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => {
        return [fakePodcast];
      },
    } as Response);
    render(<Page />);
    const podcast = await screen.findByText('Fake Podcast');
    expect(podcast).toBeInTheDocument();
  });

  it('Podcsat counter', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => {
        return [fakePodcast];
      },
    } as Response);
    render(<Page />);
    const counter = await screen.findByText('Results: 1');
    expect(counter).toBeInTheDocument();
  });
});
