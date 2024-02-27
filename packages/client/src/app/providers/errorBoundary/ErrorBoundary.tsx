import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorPage } from '@/pages/ErrorPage';

interface IState {
  isError: boolean;
}

interface IProps {
  children: ReactNode;
}

export class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { isError: false };
  }

  public static getDerivedStateFromError(): IState {
    return { isError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(`Error: ${error}`, `ErrorInfo: ${errorInfo}`);
  }

  public render() {
    if (this.state.isError) {
      return <ErrorPage text="Хьюстон у нас проблемы!" />;
    }
    return this.props.children;
  }
}
