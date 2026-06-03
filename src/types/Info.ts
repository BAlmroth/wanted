export interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame?: (playerName?: string) => void | Promise<void>;
  showStartButton?: boolean;
  showCautionOnly?: boolean;
}
