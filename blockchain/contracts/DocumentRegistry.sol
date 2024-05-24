// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentRegistry {
    // Struct to represent a Credential
    struct Credential {
        string documentHash;
        uint256 timestamp;
        bool revoked;
        // Using dynamic arrays to store attributes key-value pairs
        string[] attributeKeys;
        string[] attributeValues;
    }

    // Struct to represent a Credential Definition
    struct CredentialDefinition {
        string definitionName;
        uint256 version;
        bool active;
    }

    // Mapping from organization address to their list of credential definitions
    mapping(address => CredentialDefinition[]) public credentialDefinitions;

    // Mapping from recipient address to their list of credentials
    mapping(address => Credential[]) public credentials;

    // Event to emit when a credential is issued
    event CredentialIssued(address indexed issuer, address indexed recipient, string documentHash, uint256 timestamp);

    // Event to emit when a credential is revoked
    event CredentialRevoked(address indexed recipient, string documentHash);

    // Function to create a new credential definition
    function createCredentialDefinition(string memory definitionName, uint256 version) public {
        CredentialDefinition memory newDefinition = CredentialDefinition({
            definitionName: definitionName,
            version: version,
            active: true
        });

        credentialDefinitions[msg.sender].push(newDefinition);
    }

    // Function to issue a credential to a recipient with dynamic attributes
    function issueCredential(
        address recipient,
        string memory documentHash,
        string[] memory keys,
        string[] memory values
    ) public {
        require(keys.length == values.length, "Keys and values length mismatch");

        // Create a new Credential struct
        Credential memory newCredential = Credential({
            documentHash: documentHash,
            timestamp: block.timestamp,
            revoked: false,
            attributeKeys: keys,
            attributeValues: values
        });

        // Add the credential to the recipient's list
        credentials[recipient].push(newCredential);

        // Emit the CredentialIssued event
        emit CredentialIssued(msg.sender, recipient, documentHash, block.timestamp);
    }

    // Function to revoke a credential
    function revokeCredential(address recipient, string memory documentHash) public {
        Credential[] storage userCredentials = credentials[recipient];

        // Iterate through the list to find and revoke the matching credential
        for (uint256 i = 0; i < userCredentials.length; i++) {
            if (keccak256(abi.encodePacked(userCredentials[i].documentHash)) == keccak256(abi.encodePacked(documentHash))) {
                userCredentials[i].revoked = true;
                emit CredentialRevoked(recipient, documentHash);
                break;
            }
        }
    }

    // Function to verify if a credential exists for a recipient and is not revoked
    function verifyCredential(address recipient, string memory documentHash) public view returns (bool) {
        Credential[] storage userCredentials = credentials[recipient];

        // Iterate through the list to find a matching and non-revoked credential
        for (uint256 i = 0; i < userCredentials.length; i++) {
            if (
                keccak256(abi.encodePacked(userCredentials[i].documentHash)) == keccak256(abi.encodePacked(documentHash)) &&
                !userCredentials[i].revoked
            ) {
                return true;
            }
        }

        // Return false if no matching credential is found or if it is revoked
        return false;
    }

    // Function to update the version of a credential definition
    function updateCredentialDefinition(address organization, uint256 definitionIndex, uint256 newVersion) public {
        CredentialDefinition storage definition = credentialDefinitions[organization][definitionIndex];
        definition.version = newVersion;
    }

    // Function to get an attribute of a credential
    function getCredentialAttribute(address recipient, uint256 credentialIndex, string memory key) public view returns (string memory) {
        Credential storage credential = credentials[recipient][credentialIndex];
        for (uint256 i = 0; i < credential.attributeKeys.length; i++) {
            if (keccak256(abi.encodePacked(credential.attributeKeys[i])) == keccak256(abi.encodePacked(key))) {
                return credential.attributeValues[i];
            }
        }
        revert("Attribute not found");
    }
}
