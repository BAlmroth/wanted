export interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame?: () => void;
  showStartButton?: boolean;
  showCautionOnly?: boolean;
}
