import type {ErrorComponentProps} from '@tanstack/react-router';
import {ErrorComponent} from '@tanstack/react-router';

function PostErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}

export default PostErrorComponent;
