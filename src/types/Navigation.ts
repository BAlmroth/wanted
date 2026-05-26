import type { IdleProps } from "./Game";

export interface NavigationProps extends IdleProps {
  onInfoClick?: () => void;
  showPlayButton?: boolean;
  tivoliUrl?: string;
  ariaDescribedBy?: string;
}
