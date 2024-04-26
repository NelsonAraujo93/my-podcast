import React from 'react';

export interface SearchInput {
  handle: (event: React.ChangeEvent<HTMLInputElement>) => void;
}