// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract DocumentRegistry is AccessControl {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");

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

    // Struct to represent a Proof Request
    struct ProofRequest {
        address requester;
        string documentHash;
        bool responded;
        bool valid;
    }

    // Mapping from organization address to their list of credential definitions
    mapping(address => CredentialDefinition[]) public credentialDefinitions;

    // Mapping from recipient address to their list of credentials
    mapping(address => Credential[]) public credentials;

    // Mapping from recipient address to proof requests
    mapping(address => ProofRequest[]) public proofRequests;

    // Event to emit when a credential is issued
    event CredentialIssued(address indexed issuer, address indexed recipient, string documentHash, uint256 timestamp);

    // Event to emit when a credential is revoked
    event CredentialRevoked(address indexed recipient, string documentHash);

    // Event to emit when a proof request is made
    event ProofRequested(address indexed requester, address indexed recipient, string documentHash);

    // Event to emit when a proof response is made
    event ProofResponded(address indexed recipient, address indexed requester, string documentHash, bool valid);

    // Constructor to set up roles
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ISSUER_ROLE, msg.sender);
    }

    // Function to create a new credential definition
    function createCredentialDefinition(string memory definitionName, uint256 version) public {
        require(hasRole(ISSUER_ROLE, msg.sender), "Caller is not an issuer");
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
        require(hasRole(ISSUER_ROLE, msg.sender), "Caller is not an issuer");
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
        require(hasRole(ISSUER_ROLE, msg.sender), "Caller is not an issuer");
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
        require(hasRole(ISSUER_ROLE, msg.sender), "Caller is not an issuer");
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

    // Function to request proof of a credential
    function requestProof(address recipient, string memory documentHash) public {
        ProofRequest memory newRequest = ProofRequest({
            requester: msg.sender,
            documentHash: documentHash,
            responded: false,
            valid: false
        });

        proofRequests[recipient].push(newRequest);
        emit ProofRequested(msg.sender, recipient, documentHash);
    }

    // Function to respond to a proof request
    function respondProof(uint256 requestIndex, bool isValid) public {
        ProofRequest storage request = proofRequests[msg.sender][requestIndex];
        require(!request.responded, "Proof request already responded");

        request.responded = true;
        request.valid = isValid;

        emit ProofResponded(msg.sender, request.requester, request.documentHash, isValid);
    }
}
