const ConfirmWithdrawal = ({ amount, onBack, onConfirm }) => {
  return (
    <ModalBackdrop>
      <ModalContent>
        <ModalHeader>
          <HeaderTitle>Confirm Withdrawal</HeaderTitle>
          <HeaderSubtitle>Review your withdrawal details</HeaderSubtitle>
          <CloseButton onClick={onBack}>&times;</CloseButton>
        </ModalHeader>

        <ModalBody>
          <YoureWithdrawing>You're withdrawing</YoureWithdrawing>
          <WithdrawalAmount>₦{parseFloat(amount).toLocaleString()}</WithdrawalAmount>
          <Divider />

          <DetailsRow>
            <DetailItem>
              <IconWrapper>🏦</IconWrapper>
              <TextContent>
                <DetailLabel>To Bank Account</DetailLabel>
                <DetailValue>Access Bank •••• 8901</DetailValue>
              </TextContent>
            </DetailItem>
          </DetailsRow>

          <DetailsRow>
            <DetailItem>
              <IconWrapper>₦</IconWrapper>
              <TextContent>
                <DetailLabel>Total Deduction</DetailLabel>
                <DetailValue>₦{parseFloat(amount).toLocaleString()}</DetailValue>
              </TextContent>
            </DetailItem>
          </DetailsRow>
        </ModalBody>

        <SecurityNotice>
          <IoShieldOutline style={{ fontSize: "1.5rem" }} />
          Your transaction is secured with bank-level encryption
        </SecurityNotice>

        <ModalFooter>
          <BackButton onClick={onBack}>Back</BackButton>
          <ConfirmButton onClick={onConfirm}>Confirm Withdrawal</ConfirmButton>
        </ModalFooter>
      </ModalContent>
    </ModalBackdrop>
  );
};
export default ConfirmWithDrawal