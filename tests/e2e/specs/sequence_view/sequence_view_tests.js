module.exports = function() {
     describe('Test DNA Sequence rendering', require('./sequence/sequence_view_sequence.js'));
     describe('Test BP Index rendering', require('./bp_index/sequence_view_bp_index.js'));
     describe('Test ORF rendering', require('./orfs/sequence_view_orfs.js'));
     describe('Test Restriction Sites rendering', require('./restriction_sites/sequence_view_restriction_sites.js'));
     describe('Test Features rendering', require('./features/sequence_view_features.js'));
     describe('Test Amino Acids rendering', require('./amino_acids/sequence_view_amino_acids.js'));
};